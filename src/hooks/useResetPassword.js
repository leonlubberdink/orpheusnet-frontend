import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { resetPassword as resetPasswordApi } from '../services/apiAuth';

export function useResetPassword(resetToken) {
  const { mutate: resetPassword, status } = useMutation({
    mutationFn: async (formData) =>
      await resetPasswordApi(formData, resetToken),

    onSuccess: () => {
      toast('Passsword successfully reset!');
    },

    onError: (err) => {
      if (err.code === 'ERR_NETWORK') toast(err.message);
      if (err.message === 'Token has expired!')
        toast(`Oops! Looks like your token has timed out.`);
    },
  });

  const isLoading = status === 'pending';

  return { resetPassword, isLoading };
}
