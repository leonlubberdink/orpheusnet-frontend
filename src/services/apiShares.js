import { axioPrivate } from './axios';

export async function getGroupShares(groupId) {
  try {
    const groupSharesData = await axioPrivate.get(`/groups/${groupId}/shares`, {
      headers: { 'Content-Type': 'application/json' },
    });
    const { data: shares } = groupSharesData.data.data;
    console.log(shares);
  } catch (err) {
    throw new Error(err.message);
  }
}
