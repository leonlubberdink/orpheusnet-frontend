import { useQuery } from '@tanstack/react-query';
import { getMyGroups } from '../services/apiGroups';

export function useGroups(userId) {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ['groups', userId],
    queryFn: () => getMyGroups(userId),
    enabled: userId !== undefined && userId !== '',
    meta: {
      errorMessage: 'Failed to get users groups',
    },
  });

  return { isLoading, data, refetch };
}
