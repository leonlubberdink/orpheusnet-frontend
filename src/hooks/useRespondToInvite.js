import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { respondToInvite as respondToInviteApi } from '../services/apiGroups';

export function useRespondToInvite() {
  const queryClient = useQueryClient();

  const { mutate: respondToInvite, status } = useMutation({
    mutationFn: async (data) => {
      await respondToInviteApi(data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries();
      toast('Success!');
    },
    onError: (err) => {
      if (err.code === 'ERR_NETWORK') toast(err.message);
      toast(err.message);
    },
  });

  const isLoading = status === 'pending';

  return { respondToInvite, isLoading };
}
