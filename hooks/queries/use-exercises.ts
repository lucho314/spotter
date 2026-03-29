import { useQuery } from '@tanstack/react-query';
import { getExerciseById, getExercises, getMuscleGroups } from '@/services/exercises';

export function useMuscleGroups() {
  return useQuery({
    queryKey: ['muscle_groups'],
    queryFn: getMuscleGroups,
    staleTime: 1000 * 60 * 60 * 24, // 24h
  });
}

export function useExercises(muscleGroupId?: number) {
  return useQuery({
    queryKey: ['exercises', muscleGroupId],
    queryFn: () => getExercises(muscleGroupId),
    staleTime: 1000 * 60 * 60 * 24,
  });
}

export function useExercise(id: number | null) {
  return useQuery({
    queryKey: ['exercise', id],
    queryFn: () => getExerciseById(id!),
    enabled: id !== null,
    staleTime: 1000 * 60 * 60 * 24,
  });
}
