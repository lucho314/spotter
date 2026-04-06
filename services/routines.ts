import { supabase } from '@/lib/supabase';
import { Routine, RoutineDay, RoutineExercise } from '@/types';

export async function getRoutines(userId: string): Promise<Routine[]> {
  const { data, error } = await supabase
    .from('routines')
    .select('*, routine_exercises(id), routine_days(*)')
    .eq('user_id', userId)
    .eq('is_archived', false)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getRoutineById(id: string) {
  const { data, error } = await supabase
    .from('routines')
    .select('*, routine_days(*), routine_exercises(*, exercises(*, muscle_groups(*)))')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function createRoutineDay(payload: {
  routine_id: string;
  day_number: number;
  name: string;
}): Promise<RoutineDay> {
  const { data, error } = await supabase
    .from('routine_days')
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateRoutineDay(
  id: string,
  payload: Partial<Pick<RoutineDay, 'name'>>
): Promise<RoutineDay> {
  const { data, error } = await supabase
    .from('routine_days')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteRoutineDay(id: string): Promise<void> {
  const { error } = await supabase.from('routine_days').delete().eq('id', id);
  if (error) throw error;
}

export async function createRoutine(payload: {
  user_id: string;
  name: string;
  description?: string;
  days_per_week?: number;
}): Promise<Routine> {
  const { data, error } = await supabase
    .from('routines')
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateRoutine(
  id: string,
  payload: Partial<Pick<Routine, 'name' | 'description' | 'days_per_week'>>
): Promise<Routine> {
  const { data, error } = await supabase
    .from('routines')
    .update(payload)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function archiveRoutine(id: string): Promise<void> {
  const { error } = await supabase
    .from('routines')
    .update({ is_archived: true })
    .eq('id', id);
  if (error) throw error;
}

export async function addExerciseToRoutine(payload: {
  routine_id: string;
  exercise_id: number;
  sort_order: number;
  day_number?: number;
  target_sets?: number;
  target_reps?: number;
  rest_seconds?: number;
}): Promise<RoutineExercise> {
  const { data, error } = await supabase
    .from('routine_exercises')
    .insert(payload)
    .select('*, exercises(*, muscle_groups(*))')
    .single();
  if (error) throw error;
  return data;
}

export async function removeExerciseFromRoutine(id: string): Promise<void> {
  const { error } = await supabase
    .from('routine_exercises')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function updateRoutineExercise(
  id: string,
  payload: Partial<Pick<RoutineExercise, 'sort_order' | 'day_number' | 'target_sets' | 'target_reps' | 'rest_seconds'>>
): Promise<RoutineExercise> {
  const { data, error } = await supabase
    .from('routine_exercises')
    .update(payload)
    .eq('id', id)
    .select('*, exercises(*, muscle_groups(*))')
    .single();
  if (error) throw error;
  return data;
}
