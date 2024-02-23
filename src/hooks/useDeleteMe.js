import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { deleteMe as deleteMeApi } from '../services/apiUser';

export function useDeleteMe() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteMe, status } = useMutation({
    mutationFn: async () => await deleteMeApi(),

    onSuccess: () => {
      queryClient.invalidateQueries(['me']);
      toast('Account deleted!');
      navigate('/');
    },

    onError: (err) => {
      toast(err.message);
    },
  });

  const isLoading = status === 'pending';

  return { deleteMe, isLoading };
}
