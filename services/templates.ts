import { supabase } from '@/lib/supabase';
import { FitnessGoal, RoutineTemplate } from '@/types';

export async function getTemplates(
  goal?: FitnessGoal,
  daysPerWeek?: number
): Promise<RoutineTemplate[]> {
  let query = supabase
    .from('routine_templates')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (goal) query = query.eq('goal', goal);
  if (daysPerWeek) query = query.eq('days_per_week', daysPerWeek);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getTemplateById(id: string): Promise<RoutineTemplate> {
  const { data, error } = await supabase
    .from('routine_templates')
    .select(`
      *,
      template_days (
        *,
        template_day_exercises (
          *,
          exercises (*, muscle_groups(*))
        )
      )
    `)
    .eq('id', id)
    .single();
  if (error) throw error;

  // Sort days and exercises by sort_order
  if (data.template_days) {
    data.template_days.sort((a: any, b: any) => a.day_number - b.day_number);
    for (const day of data.template_days) {
      if (day.template_day_exercises) {
        day.template_day_exercises.sort((a: any, b: any) => a.sort_order - b.sort_order);
      }
    }
  }

  return data;
}

export async function adoptTemplate(
  userId: string,
  templateId: string
): Promise<string[]> {
  const template = await getTemplateById(templateId);

  const routineIds: string[] = [];

  for (const day of template.template_days ?? []) {
    // Create routine for each day
    const { data: routine, error: routineError } = await supabase
      .from('routines')
      .insert({
        user_id: userId,
        name: `${template.name_es} - ${day.name_es}`,
        description: template.description_es,
        days_per_week: template.days_per_week,
        source_template_id: templateId,
      })
      .select('id')
      .single();

    if (routineError) throw routineError;

    routineIds.push(routine.id);

    // Copy exercises to routine_exercises
    const exercises = (day.template_day_exercises ?? []).map((tde, index) => ({
      routine_id: routine.id,
      exercise_id: tde.exercise_id,
      sort_order: tde.sort_order ?? index,
      target_sets: tde.target_sets,
      target_reps: tde.target_reps,
      rest_seconds: tde.rest_seconds,
    }));

    if (exercises.length > 0) {
      const { error: exError } = await supabase
        .from('routine_exercises')
        .insert(exercises);
      if (exError) throw exError;
    }
  }

  return routineIds;
}
