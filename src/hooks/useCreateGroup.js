import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createGroup as createGroupApi } from '../services/apiGroups';

export function useCreateGroup() {
  const queryClient = useQueryClient();

  const { mutate: createGroup, status } = useMutation({
    mutationFn: (formData) => createGroupApi(formData),
    onSuccess: () => {
      queryClient.invalidateQueries('groups');
      toast('Group created!');
    },
    onError: (err) => {
      toast(err.message);
    },
  });

  const isLoading = status === 'pending';

  return { createGroup, isLoading };
}
