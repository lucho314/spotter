import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from '@/services/progress';
import { useAuth } from '@/lib/auth';

export function useDashboardStats() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['dashboard', user?.id],
    queryFn: () => getDashboardStats(user!.id),
    enabled: !!user,
    staleTime: 1000 * 60,
  });
}
