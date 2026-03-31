import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createSession,
  completeSession,
  cancelSession,
  deleteSession,
  insertSet,
  updateWorkoutSet,
  deleteWorkoutSet,
  addWorkoutSet,
  getSessions,
  getSessionById,
} from '@/services/workouts';
import { useAuth } from '@/lib/auth';

export const sessionKeys = {
  all: ['sessions'] as const,
  lists: () => [...sessionKeys.all, 'list'] as const,
  detail: (id: string) => [...sessionKeys.all, 'detail', id] as const,
};

export function useSessions() {
  const { user } = useAuth();
  return useQuery({
    queryKey: sessionKeys.lists(),
    queryFn: () => getSessions(user!.id),
    enabled: !!user,
  });
}

export function useSession(id: string) {
  return useQuery({
    queryKey: sessionKeys.detail(id),
    queryFn: () => getSessionById(id),
  });
}

export function useCreateSession() {
  const { user } = useAuth();
  return useMutation({
    mutationFn: (routineId?: string) =>
      createSession({ user_id: user!.id, routine_id: routineId }),
  });
}

export function useCompleteSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, notes }: { id: string; notes?: string }) =>
      completeSession(id, notes),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: sessionKeys.lists() });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useCancelSession() {
  return useMutation({
    mutationFn: (id: string) => cancelSession(id),
  });
}

export function useDeleteSession() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSession(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: sessionKeys.lists() });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
      qc.invalidateQueries({ queryKey: ['profile-stats'] });
    },
  });
}

export function useInsertSet() {
  return useMutation({
    mutationFn: insertSet,
  });
}

export function useUpdateWorkoutSet(sessionId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, weight_kg, reps }: { id: string; weight_kg: number; reps: number }) =>
      updateWorkoutSet(id, { weight_kg, reps }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: sessionKeys.detail(sessionId) });
    },
  });
}

export function useDeleteWorkoutSet(sessionId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteWorkoutSet(id),
    onSuccess: () => {
      qc.refetchQueries({ queryKey: sessionKeys.detail(sessionId) });
    },
  });
}

export function useAddWorkoutSet(sessionId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { session_id: string; exercise_id: number; set_number: number; weight_kg: number; reps: number }) =>
      addWorkoutSet(payload),
    onSuccess: () => {
      qc.refetchQueries({ queryKey: sessionKeys.detail(sessionId) });
    },
  });
}
