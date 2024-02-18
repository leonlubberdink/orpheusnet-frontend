import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateMe as updateMeApi } from '../services/userApi';

export function useSettings() {
  const { mutate: updateMe, status } = useMutation({
    mutationFn: async (formData) => await updateMeApi(formData),

    onSuccess: () => {
      toast('Saved your settings!');
    },

    onError: (err) => {
      toast(err.message);
    },
  });

  const isLoading = status === 'pending';

  return { updateMe, isLoading };
}
