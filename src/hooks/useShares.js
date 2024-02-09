import { useQuery } from '@tanstack/react-query';

import { getGroupShares } from '../services/apiShares';

export function useShares(groupId) {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['shares', groupId],
    queryFn: () => getGroupShares(groupId),
    enabled: !!groupId,
  });

  return { isLoading, isError, data, error };
}
