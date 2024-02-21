import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { updateImage as updateImageApi } from '../services/apiUser';

export function useImage() {
  const queryClient = useQueryClient();

  const { mutate: updateImage, status } = useMutation({
    mutationFn: async (image) => await updateImageApi(image),

    onSuccess: () => {
      queryClient.invalidateQueries(['me']);
      toast('Image updated!');
    },

    onError: (err) => {
      toast(err.message);
    },
  });

  const isLoading = status === 'pending';

  return { updateImage, isLoading };
}
