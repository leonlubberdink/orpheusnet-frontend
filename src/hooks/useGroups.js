import { useQuery } from '@tanstack/react-query';

import { getMyGroups } from '../services/apiGroups';

export function useGroups(userId) {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['groups', userId],
    queryFn: () => getMyGroups(userId),
    enabled: !!userId,
  });

  return { isLoading, isError, data, error };
}
