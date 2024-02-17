import { useQuery } from '@tanstack/react-query';

import { getInvites } from '../services/apiGroups';

export function useInvites(userId) {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['invites', userId],
    queryFn: () => getInvites(userId),
    enabled: !!userId,
  });

  return { isLoading, isError, data, error };
}
