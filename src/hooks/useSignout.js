import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logout as signoutApi } from '../services/apiAuth';
import { useAuth } from '../hooks/useAuth';

export function useSignout() {
  const { setAuth } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: signout } = useMutation({
    mutationFn: () => signoutApi(),
    onSuccess: () => {
      queryClient.invalidateQueries('user');
      queryClient.invalidateQueries('shares');
      queryClient.invalidateQueries('groups');
      setAuth({});
    },
  });

  return { signout };
}
