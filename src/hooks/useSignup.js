import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { signup as signupApi } from '../services/apiAuth';
import { useAuth } from '../hooks/useAuth';

export function useSignup() {
  const { setAuth } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: (formData) => signupApi(formData),
    onSuccess: (user) => {
      const { accessToken } = user;
      const { user: userData } = user.data;
      queryClient.setQueriesData(['user'], { ...userData });
      setAuth({ user: userData, accessToken });
      toast('Your account was successfully created!');
      navigate(`/app/feed/`);
    },
    onError: (err) => {
      if (err.code === 'ERR_NETWORK') toast(err.message);
      toast(err.response.data.message);
    },
  });

  return { signup, isLoading };
}
