import { useQuery } from '@tanstack/react-query';
import { getPersonalRecords, getExerciseProgress } from '@/services/progress';
import { useAuth } from '@/lib/auth';

export function usePersonalRecords() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['personal_records', user?.id],
    queryFn: () => getPersonalRecords(user!.id),
    enabled: !!user,
  });
}

export function useExerciseProgress(exerciseId: number) {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['exercise_progress', user?.id, exerciseId],
    queryFn: () => getExerciseProgress(user!.id, exerciseId),
    enabled: !!user && !!exerciseId,
  });
}
