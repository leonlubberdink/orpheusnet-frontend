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

      // Display toast later
    },
    onError: (err) => {
      console.log(err.message);
      // Display toast later
    },
  });

  return { createGroup, isLoading };
}
