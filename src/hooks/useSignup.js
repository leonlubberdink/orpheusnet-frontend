import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { signup as signupApi } from '../services/apiAuth';
import useAuth from './useAuth';

export function useSignup() {
  const { setAuth } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, status } = useMutation({
    mutationFn: (formData) => signupApi(formData),
    onSuccess: (user) => {
      const { accessToken } = user;
      const { user: userData } = user.data;
      queryClient.setQueriesData(['user'], { ...userData });
      setAuth({ user: userData, accessToken });
      toast(
        'Your account was successfully created! Please confirm your account.'
      );
      navigate(`/confirm`);
    },
    onError: (err) => {
      if (err.code === 'ERR_NETWORK') toast(err.message);
      toast(err.response.data.message);
    },
  });

  const isLoading = status === 'pending';

  return { signup, isLoading };
}
