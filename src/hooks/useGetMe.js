import { useQuery } from '@tanstack/react-query';

import { getMe } from '../services/apiUser';

export function useGetMe() {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['me'],
    queryFn: () => getMe(),
  });

  return { isLoading, isError, data, error };
}
