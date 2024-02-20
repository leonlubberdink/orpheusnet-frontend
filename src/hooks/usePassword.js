import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updatePassword as updatePasswordApi } from '../services/userApi';

export function usePassword() {
  const queryClient = useQueryClient();

  const { mutate: updatePassword, status } = useMutation({
    mutationFn: async (changedPassword) =>
      await updatePasswordApi(changedPassword),

    onSuccess: () => {
      queryClient.invalidateQueries(['me']);
      toast('Saved your password!');
    },

    onError: (err) => {
      toast(err.message);
    },
  });

  const isLoading = status === 'pending';

  return { updatePassword, isLoading };
}
