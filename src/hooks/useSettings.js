import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateMe as updateMeApi } from '../services/apiUser';

export function useSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateMe, status } = useMutation({
    mutationFn: async (newUserInfo) => await updateMeApi(newUserInfo),

    onSuccess: () => {
      queryClient.invalidateQueries(['me']);
      toast('Saved your settings!');
    },

    onError: (err) => {
      toast(err.message);
    },
  });

  const isLoading = status === 'pending';

  return { updateMe, isLoading };
}
