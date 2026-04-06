import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const GATEWAY_URL = 'https://ai-gateway.vercel.sh/v1/chat/completions'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { image_base64, image_mime_type, user_id } = await req.json()

    if (!image_base64 || !user_id) {
      throw new Error('Faltan campos requeridos: image_base64, user_id')
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // Traer todos los ejercicios disponibles
    const { data: exercises, error: exError } = await supabase
      .from('exercises')
      .select('id, name, name_en, muscle_groups(name)')
      .order('name')

    if (exError) throw exError

    const exerciseList = exercises.map((e: any) => ({
      id: e.id,
      name: e.name,
      name_en: e.name_en,
      muscle_group: e.muscle_groups?.name ?? '',
    }))

    const prompt = `Analizá esta imagen de una rutina de gimnasio.

Tenés disponible esta lista de ejercicios con sus IDs:
${JSON.stringify(exerciseList)}

Tu tarea:
1. Identificá todos los ejercicios de la imagen.
2. Para cada ejercicio, encontrá el ID más cercano en la lista buscando coincidencias por nombre en español o inglés. Si no hay coincidencia exacta, elegí el más similar por grupo muscular y movimiento.
3. Extraé series, repeticiones y descanso. Si vienen en rango (ej: "8-10 reps", "1-2 min"), usá el valor inferior.
4. Si no hay descanso indicado, usá 90 segundos.
5. Si hay múltiples días, extraé cada uno con su nombre tal como aparece en la imagen.
6. Si no hay estructura de días, agrupá todos los ejercicios en un único día llamado "Día 1".

Respondé ÚNICAMENTE con JSON válido, sin texto adicional, con este formato exacto:
{
  "routine_name": "string",
  "days": [
    {
      "day_name": "string",
      "exercises": [
        {
          "exercise_id": number,
          "target_sets": number,
          "target_reps": number,
          "rest_seconds": number,
          "sort_order": number
        }
      ]
    }
  ]
}`

    const aiRes = await fetch(GATEWAY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get('VERCEL_AI_GATEWAY_KEY')}`,
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image_url',
                image_url: { url: `data:${image_mime_type ?? 'image/jpeg'};base64,${image_base64}` },
              },
              { type: 'text', text: prompt },
            ],
          },
        ],
        response_format: { type: 'json' },
      }),
    })

    if (!aiRes.ok) {
      const errText = await aiRes.text()
      throw new Error(`AI Gateway error ${aiRes.status}: ${errText}`)
    }

    const aiData = await aiRes.json()
    const content = aiData.choices?.[0]?.message?.content
    if (!content) throw new Error('Respuesta vacía del modelo')

    // Gemini a veces envuelve el JSON en ```json ... ```
    const jsonStr = content.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
    const parsed = JSON.parse(jsonStr)

    if (!parsed.days?.length) throw new Error('No se pudieron extraer ejercicios de la imagen')

    // Crear rutina
    const { data: routine, error: routineError } = await supabase
      .from('routines')
      .insert({
        user_id,
        name: parsed.routine_name ?? 'Rutina importada',
        days_per_week: parsed.days.length,
      })
      .select()
      .single()

    if (routineError) throw routineError

    // Crear días y ejercicios
    for (let i = 0; i < parsed.days.length; i++) {
      const day = parsed.days[i]
      const dayNumber = i + 1

      const { error: dayError } = await supabase.from('routine_days').insert({
        routine_id: routine.id,
        day_number: dayNumber,
        name: day.day_name,
      })
      if (dayError) throw dayError

      if (day.exercises?.length > 0) {
        const { error: exercisesError } = await supabase.from('routine_exercises').insert(
          day.exercises.map((ex: any) => ({
            routine_id: routine.id,
            exercise_id: ex.exercise_id,
            day_number: dayNumber,
            sort_order: ex.sort_order ?? 0,
            target_sets: ex.target_sets ?? 3,
            target_reps: ex.target_reps ?? 10,
            rest_seconds: ex.rest_seconds ?? 90,
          }))
        )
        if (exercisesError) throw exercisesError
      }
    }

    return new Response(
      JSON.stringify({ routine_id: routine.id, routine_name: routine.name }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err: any) {
    console.error('parse-routine-image error:', err)
    return new Response(
      JSON.stringify({ error: err.message ?? 'Error interno' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
