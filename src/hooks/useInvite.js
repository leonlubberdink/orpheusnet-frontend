import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { inviteMember as inviteMemberApi } from '../services/apiGroups';

export function useInvite() {
  const { mutate: inviteMember, status } = useMutation({
    mutationFn: (data) => {
      inviteMemberApi(data);
    },
    onSuccess: () => {
      toast('Invite sent!');
    },
    onError: (err) => {
      if (err.code === 'ERR_NETWORK') toast(err.message);
      toast(err.response.data.message);
    },
  });

  const isLoading = status === 'pending';

  return { inviteMember, isLoading };
}
