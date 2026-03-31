import { supabase } from '@/lib/supabase';
import { WorkoutSession, WorkoutSet } from '@/types';

export async function createSession(payload: {
  user_id: string;
  routine_id?: string;
}): Promise<WorkoutSession> {
  const { data, error } = await supabase
    .from('workout_sessions')
    .insert({ ...payload, status: 'in_progress' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function completeSession(
  id: string,
  notes?: string
): Promise<WorkoutSession> {
  const { data, error } = await supabase
    .from('workout_sessions')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
      notes,
    })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function cancelSession(id: string): Promise<void> {
  const { error } = await supabase
    .from('workout_sessions')
    .update({ status: 'cancelled', completed_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

export async function insertSet(payload: {
  session_id: string;
  exercise_id: number;
  set_number: number;
  weight_kg: number;
  reps: number;
  rpe?: number;
  is_warmup?: boolean;
}): Promise<WorkoutSet> {
  const { data, error } = await supabase
    .from('workout_sets')
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getSessions(userId: string): Promise<WorkoutSession[]> {
  const { data, error } = await supabase
    .from('workout_sessions')
    .select('*, routines(id, name)')
    .eq('user_id', userId)
    .eq('status', 'completed')
    .order('started_at', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getSessionById(id: string) {
  const { data, error } = await supabase
    .from('workout_sessions')
    .select('*, routines(id, name), workout_sets(*, exercises(*, muscle_groups(*)))')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function deleteSession(id: string): Promise<void> {
  const { error, count } = await supabase
    .from('workout_sessions')
    .delete({ count: 'exact' })
    .eq('id', id);
  if (error) throw error;
  if (count === 0) throw new Error('No se pudo eliminar la sesión. Verificá los permisos.');
}

export async function updateWorkoutSet(
  id: string,
  payload: { weight_kg: number; reps: number }
): Promise<void> {
  const { error } = await supabase
    .from('workout_sets')
    .update(payload)
    .eq('id', id);
  if (error) throw error;
}

export async function deleteWorkoutSet(id: string): Promise<void> {
  const { error } = await supabase
    .from('workout_sets')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

export async function addWorkoutSet(payload: {
  session_id: string;
  exercise_id: number;
  set_number: number;
  weight_kg: number;
  reps: number;
}): Promise<WorkoutSet> {
  const { data, error } = await supabase
    .from('workout_sets')
    .insert({ ...payload, completed_at: new Date().toISOString() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getInProgressSession(userId: string): Promise<WorkoutSession | null> {
  const { data, error } = await supabase
    .from('workout_sessions')
    .select('*')
    .eq('user_id', userId)
    .eq('status', 'in_progress')
    .maybeSingle();
  if (error) throw error;
  return data;
}
