import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { shareMusicToGroup } from '../services/apiShares';

export function useShareMusic(resetStatesCallback) {
  const queryClient = useQueryClient();

  const {
    mutate: shareMusic,
    isLoading,
    isSuccess,
    status,
  } = useMutation({
    mutationFn: (shareData) => {
      return shareMusicToGroup(shareData);
    },
    onSuccess: (newShare, shareData) => {
      queryClient.invalidateQueries(['shares', shareData.selectedGroupId]);
      queryClient.setQueryData(
        ['shares', shareData.selectedGroupId],
        (oldShares) => {
          return [...oldShares, newShare];
        }
      );
      queryClient.invalidateQueries('groups');
      toast(
        `Successfully shared "${newShare.publisher} - ${newShare.title}" to group!`
      );
      resetStatesCallback();
    },
    onError: (err) => {
      if (err.code === 'ERR_NETWORK') toast(err.message);

      if (err.error.name === 'ValidationError') {
        err.error.errors.format && toast(err.error.errors.format.message);
        err.error.errors.shareUrl && toast(err.error.errors.shareUrl.message);
      }

      if (err.message.includes('This is not a valid SoundCloud url'))
        toast(err.message);
    },
  });

  return { shareMusic, isLoading, isSuccess, status };
}
