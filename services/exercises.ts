import { supabase } from '@/lib/supabase';
import { Exercise, MuscleGroup } from '@/types';

export async function getMuscleGroups(): Promise<MuscleGroup[]> {
  const { data, error } = await supabase
    .from('muscle_groups')
    .select('*')
    .order('name');
  if (error) throw error;
  return data;
}

export async function getExercises(muscleGroupId?: number): Promise<Exercise[]> {
  let query = supabase
    .from('exercises')
    .select('*, muscle_groups(*)')
    .order('name');
  if (muscleGroupId) {
    query = query.eq('muscle_group_id', muscleGroupId);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getExerciseById(id: number): Promise<Exercise> {
  const { data, error } = await supabase
    .from('exercises')
    .select('*, muscle_groups(*)')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function searchExercises(query: string): Promise<Exercise[]> {
  const { data, error } = await supabase
    .from('exercises')
    .select('*, muscle_groups(*)')
    .ilike('name', `%${query}%`)
    .order('name')
    .limit(30);
  if (error) throw error;
  return data;
}
