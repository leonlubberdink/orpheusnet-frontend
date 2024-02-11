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

  console.log(formData);

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
