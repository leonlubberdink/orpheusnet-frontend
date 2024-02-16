import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { inviteMember as inviteMemberApi } from '../services/apiGroups';

export function useInvite() {
  const { mutate: inviteMember, status } = useMutation({
    mutationFn: async (data) => {
      await inviteMemberApi(data);
    },
    onSuccess: () => {
      toast('Invite sent!');
    },
    onError: (err) => {
      if (err.code === 'ERR_NETWORK') toast(err.message);
      toast(err.message);
    },
  });

  const isLoading = status === 'pending';

  return { inviteMember, isLoading };
}
