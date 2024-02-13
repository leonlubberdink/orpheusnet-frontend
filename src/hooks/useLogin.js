import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { setHeaderToken } from '../services/axios';
import { login as loginApi } from '../services/apiAuth';
import { useGroupContext } from '../context/GroupContext';
import { useAuth } from './useAuth';

export function useLogin() {
  const { setSelectedGroupId, setSelectedGroupName } = useGroupContext();
  const { setAuth } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, status } = useMutation({
    mutationFn: (formData) => loginApi(formData),
    onSuccess: (user) => {
      queryClient.invalidateQueries();
      const { accessToken } = user.data;
      const { user: userData } = user.data.data;

      setHeaderToken(accessToken);
      setAuth({ user: userData, accessToken });

      if (userData?.emailVerified && userData?.groups[0]) {
        setSelectedGroupId(userData.groups[0]);
        setSelectedGroupName(userData.groups[0].groupName);
        navigate(`/app/feed/${userData.groups[0]}`, { replace: true });
        toast('Successfully logged in!');
      } else if (userData?.emailVerified) {
        navigate(`/app/feed`, { replace: true });
        toast('Successfully logged in!');
      } else {
        navigate(`/confirm`);
        toast('Please verify your account!');
      }
    },
    onError: (err) => {
      if (err.code === 'ERR_NETWORK') toast(err.message);
      toast(err.response.data.message);
    },
  });

  return { login, status };
}
