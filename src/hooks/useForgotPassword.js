import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { forgotPassword as forgotPasswordApi } from '../services/apiAuth';

export function useForgotPassword() {
  const { mutate: forgotPassword, status } = useMutation({
    mutationFn: async (formData) => {
      await forgotPasswordApi(formData);
    },
    onSuccess: () => {
      toast('Email sent!');
    },
    onError: (err) => {
      if (err.code === 'ERR_NETWORK') toast(err.message);
      toast(err.message);
    },
  });

  const isLoading = status === 'pending';

  return { forgotPassword, isLoading };
}
