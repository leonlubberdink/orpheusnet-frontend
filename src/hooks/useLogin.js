import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { login as loginApi } from '../services/apiAuth';
import { useGroupContext } from '../context/GroupContext';
import { useAuth } from './useAuth';

export function useLogin() {
  const { setSelectedGroupId } = useGroupContext();
  const { setAuth } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, status } = useMutation({
    mutationFn: (formData) => loginApi(formData),
    onSuccess: (user) => {
      const { accessToken } = user.data;
      const { user: userData } = user.data.data;
      queryClient.setQueriesData(['user'], { ...userData });
      setAuth({ user: userData, accessToken });
      toast('Successfully logged in!');

      if (userData?.groups[0]) {
        setSelectedGroupId(userData.groups[0]);
        navigate(`/app/feed/${userData.groups[0]}`);
      } else {
        navigate(`/app/feed`);
      }
    },
    onError: (err) => {
      if (err.code === 'ERR_NETWORK') toast(err.message);
      toast(err.response.data.message);
    },
  });

  return { login, status };
}
