import { supabase } from '@/lib/supabase';

function generateShareCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

export async function shareRoutine(routineId: string, sharedBy: string) {
  const share_code = generateShareCode();
  const { data, error } = await supabase
    .from('shared_routines')
    .insert({ routine_id: routineId, shared_by: sharedBy, share_code })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getSharedRoutineByCode(code: string) {
  const { data, error } = await supabase
    .from('shared_routines')
    .select('*, routines(*, routine_days(*), routine_exercises(*, exercises(*, muscle_groups(*))))')
    .eq('share_code', code)
    .eq('is_active', true)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function importRoutine(shareCode: string, userId: string) {
  const shared = await getSharedRoutineByCode(shareCode);
  if (!shared) throw new Error('Código inválido o expirado');

  const sourceRoutine = (shared as any).routines;
  const { data: newRoutine, error: routineError } = await supabase
    .from('routines')
    .insert({
      user_id: userId,
      name: `${sourceRoutine.name} (importada)`,
      description: sourceRoutine.description,
      days_per_week: sourceRoutine.days_per_week,
    })
    .select()
    .single();

  if (routineError) throw routineError;

  const exercises = sourceRoutine.routine_exercises ?? [];
  if (exercises.length > 0) {
    const { error: exError } = await supabase.from('routine_exercises').insert(
      exercises.map((re: any) => ({
        routine_id: newRoutine.id,
        exercise_id: re.exercise_id,
        sort_order: re.sort_order,
        day_number: re.day_number ?? 1,
        target_sets: re.target_sets,
        target_reps: re.target_reps,
        rest_seconds: re.rest_seconds,
      }))
    );
    if (exError) throw exError;
  }

  const days = sourceRoutine.routine_days ?? [];
  if (days.length > 0) {
    const { error: daysError } = await supabase.from('routine_days').insert(
      days.map((d: any) => ({
        routine_id: newRoutine.id,
        day_number: d.day_number,
        name: d.name,
      }))
    );
    if (daysError) throw daysError;
  }

  return newRoutine;
}
