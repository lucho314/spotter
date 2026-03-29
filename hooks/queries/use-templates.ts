import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { adoptTemplate, getTemplateById, getTemplates } from '@/services/templates';
import { FitnessGoal } from '@/types';
import { useAuth } from '@/lib/auth';

export function useTemplates(goal?: FitnessGoal, daysPerWeek?: number) {
  return useQuery({
    queryKey: ['templates', goal, daysPerWeek],
    queryFn: () => getTemplates(goal, daysPerWeek),
    staleTime: 1000 * 60 * 60, // 1h
  });
}

export function useTemplate(id: string | null) {
  return useQuery({
    queryKey: ['template', id],
    queryFn: () => getTemplateById(id!),
    enabled: id !== null,
    staleTime: 1000 * 60 * 60,
  });
}

export function useAdoptTemplate() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (templateId: string) => adoptTemplate(user!.id, templateId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['routines'] });
    },
  });
}
