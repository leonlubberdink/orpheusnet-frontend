import { axioPrivate } from './axios';

export async function getGroupShares(groupId) {
  try {
    const groupSharesData = await axioPrivate.get(`/groups/${groupId}/shares`, {
      headers: { 'Content-Type': 'application/json' },
    });
    const { data: shares } = groupSharesData.data.data;
    return shares;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function shareMusicToGroup(shareData) {
  const { selectedGroupId, formData } = shareData;

  try {
    const shareResponse = await axioPrivate.post(
      `/groups/${selectedGroupId}/shares`,
      JSON.stringify(formData),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    return shareResponse.data.data.data;
  } catch (err) {
    throw err.response.data;
  }
}

export async function deleteShare(shareId) {
  try {
    const res = await axioPrivate.delete(`/shares/${shareId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}
