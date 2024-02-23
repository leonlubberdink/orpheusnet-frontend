import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { deleteShare as deleteShareApi } from '../services/apiShares';

export function useDeleteShare() {
  const queryClient = useQueryClient();

  const { mutate: deleteShare, status } = useMutation({
    mutationFn: (shareId) => {
      return deleteShareApi(shareId);
    },
    onSuccess: async (groupId) => {
      await queryClient.invalidateQueries(['shares', groupId]);
      await queryClient.invalidateQueries('groups');
    },
    onSettled: () => {
      toast(`Music successfully deleted share!`);
    },
    onError: (err) => {
      if (err.code === 'ERR_NETWORK') toast(err.message);
    },
  });

  const isLoading = status === 'pending';

  return { deleteShare, isLoading };
}
