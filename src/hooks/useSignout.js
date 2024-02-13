import { useMutation, useQueryClient } from '@tanstack/react-query';

import { logout as signoutApi } from '../services/apiAuth';
import { useAuth } from '../hooks/useAuth';
import { useGroupContext } from '../context/GroupContext';

export function useSignout() {
  const { setSelectedGroupId } = useGroupContext();
  const { setAuth } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: signout } = useMutation({
    mutationFn: () => signoutApi(),
    onSuccess: () => {
      queryClient.clear();
      setSelectedGroupId('');
      setAuth({});
    },
  });

  return { signout };
}
