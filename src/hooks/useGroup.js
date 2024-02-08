import { useQuery } from '@tanstack/react-query';

import { getGroup } from '../services/apiGroups';

export function useGroup(groupId) {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['group', groupId],
    queryFn: () => getGroup(groupId),
    enabled: !!groupId,
  });

  return { isLoading, isError, data, error };
}
