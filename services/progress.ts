import { supabase } from '@/lib/supabase';
import { PersonalRecord } from '@/types';

export async function getPersonalRecords(userId: string): Promise<PersonalRecord[]> {
  const { data, error } = await supabase
    .from('personal_records')
    .select('*, exercises(*, muscle_groups(*))')
    .eq('user_id', userId)
    .order('estimated_1rm', { ascending: false });
  if (error) throw error;
  return data;
}

export async function getExerciseProgress(userId: string, exerciseId: number) {
  const { data, error } = await supabase
    .from('workout_sets')
    .select('weight_kg, reps, completed_at, workout_sessions!inner(user_id)')
    .eq('workout_sessions.user_id', userId)
    .eq('exercise_id', exerciseId)
    .eq('is_warmup', false)
    .order('completed_at', { ascending: true })
    .limit(30);
  if (error) throw error;
  return data;
}

export async function getDashboardStats(userId: string) {
  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  weekStart.setHours(0, 0, 0, 0);

  const [sessionsResult, prResult] = await Promise.all([
    supabase
      .from('workout_sessions')
      .select('id, started_at, completed_at')
      .eq('user_id', userId)
      .eq('status', 'completed')
      .gte('started_at', weekStart.toISOString()),
    supabase
      .from('personal_records')
      .select('*, exercises(name)')
      .eq('user_id', userId)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  if (sessionsResult.error) throw sessionsResult.error;

  return {
    sessionsThisWeek: sessionsResult.data.length,
    latestPR: prResult.data,
  };
}
