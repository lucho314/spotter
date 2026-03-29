import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';

const PENDING_KEY = '@spotter/pending_workouts';

export interface PendingWorkoutSet {
  exercise_id: number;
  set_number: number;
  weight_kg: number;
  reps: number;
  is_warmup: boolean;
}

export interface PendingWorkout {
  localId: string;
  userId: string;
  routineId: string | null;
  startedAt: string;
  completedAt: string;
  notes?: string;
  sets: PendingWorkoutSet[];
}

async function batchSave(workout: PendingWorkout): Promise<void> {
  const { data: session, error: sessionErr } = await supabase
    .from('workout_sessions')
    .insert({
      user_id: workout.userId,
      routine_id: workout.routineId,
      status: 'completed',
      started_at: workout.startedAt,
      completed_at: workout.completedAt,
      notes: workout.notes ?? null,
    })
    .select('id')
    .single();
  if (sessionErr) throw sessionErr;

  if (workout.sets.length > 0) {
    const { error: setsErr } = await supabase
      .from('workout_sets')
      .insert(workout.sets.map((s) => ({ ...s, session_id: session.id })));
    if (setsErr) throw setsErr;
  }
}

/** Try to save workout to Supabase immediately. Throws on network/DB error. */
export async function saveWorkout(workout: PendingWorkout): Promise<void> {
  await batchSave(workout);
}

/** Add a workout to the local pending queue (AsyncStorage). */
export async function queueWorkout(workout: PendingWorkout): Promise<void> {
  const raw = await AsyncStorage.getItem(PENDING_KEY);
  const queue: PendingWorkout[] = raw ? JSON.parse(raw) : [];
  queue.push(workout);
  await AsyncStorage.setItem(PENDING_KEY, JSON.stringify(queue));
}

/** Returns number of workouts waiting to be synced. */
export async function getPendingCount(): Promise<number> {
  const raw = await AsyncStorage.getItem(PENDING_KEY);
  if (!raw) return 0;
  return (JSON.parse(raw) as PendingWorkout[]).length;
}

/**
 * Process all pending workouts. Returns the number successfully synced.
 * Workouts that still fail stay in the queue.
 */
export async function syncPendingWorkouts(): Promise<number> {
  const raw = await AsyncStorage.getItem(PENDING_KEY);
  if (!raw) return 0;
  const queue: PendingWorkout[] = JSON.parse(raw);
  if (queue.length === 0) return 0;

  const failed: PendingWorkout[] = [];
  let synced = 0;

  for (const workout of queue) {
    try {
      await batchSave(workout);
      synced++;
    } catch {
      failed.push(workout);
    }
  }

  await AsyncStorage.setItem(PENDING_KEY, JSON.stringify(failed));
  return synced;
}
