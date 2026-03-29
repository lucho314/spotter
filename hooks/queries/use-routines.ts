import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getRoutines,
  getRoutineById,
  createRoutine,
  updateRoutine,
  archiveRoutine,
  addExerciseToRoutine,
  removeExerciseFromRoutine,
  updateRoutineExercise,
} from '@/services/routines';
import { useAuth } from '@/lib/auth';

export const routineKeys = {
  all: ['routines'] as const,
  lists: () => [...routineKeys.all, 'list'] as const,
  detail: (id: string) => [...routineKeys.all, 'detail', id] as const,
};

export function useRoutines() {
  const { user } = useAuth();
  return useQuery({
    queryKey: routineKeys.lists(),
    queryFn: () => getRoutines(user!.id),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });
}

export function useRoutine(id: string) {
  return useQuery({
    queryKey: routineKeys.detail(id),
    queryFn: () => getRoutineById(id),
    staleTime: 1000 * 60 * 2,
  });
}

export function useCreateRoutine() {
  const qc = useQueryClient();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (payload: { name: string; description?: string; days_per_week?: number }) =>
      createRoutine({ ...payload, user_id: user!.id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: routineKeys.lists() }),
  });
}

export function useUpdateRoutine(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { name?: string; description?: string; days_per_week?: number }) =>
      updateRoutine(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: routineKeys.lists() });
      qc.invalidateQueries({ queryKey: routineKeys.detail(id) });
    },
  });
}

export function useArchiveRoutine() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => archiveRoutine(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: routineKeys.lists() }),
  });
}

export function useAddExercise(routineId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: {
      exercise_id: number;
      sort_order: number;
      target_sets?: number;
      target_reps?: number;
      rest_seconds?: number;
    }) => addExerciseToRoutine({ ...payload, routine_id: routineId }),
    onSuccess: () => qc.invalidateQueries({ queryKey: routineKeys.detail(routineId) }),
  });
}

export function useRemoveExercise(routineId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeExerciseFromRoutine(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: routineKeys.detail(routineId) }),
  });
}

export function useUpdateRoutineExercise(routineId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: { target_sets?: number; target_reps?: number; rest_seconds?: number } }) =>
      updateRoutineExercise(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: routineKeys.detail(routineId) }),
  });
}
