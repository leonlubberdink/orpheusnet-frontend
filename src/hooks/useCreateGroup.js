import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { createGroup as createGroupApi } from '../services/apiGroups';

export function useCreateGroup() {
  const queryClient = useQueryClient();

  const { mutate: createGroup, isLoading } = useMutation({
    mutationFn: (formData) => createGroupApi(formData),
    onSuccess: (response, formData) => {
      queryClient.invalidateQueries(['groups', formData.userId]);
      queryClient.invalidateQueries('groups');

      toast('Group created!');
    },
    onError: (err) => {
      console.log(err.message);
      toast(err.message);
    },
  });

  return { createGroup, isLoading };
}
