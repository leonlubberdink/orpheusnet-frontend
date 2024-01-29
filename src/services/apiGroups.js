import { axioPrivate } from './axios';

export async function getMyGroups(userId) {
  try {
    const groupData = await axioPrivate.get(`/users/${userId}/groups`, {
      headers: { 'Content-Type': 'application/json' },
    });

    const { data: groups } = groupData.data.data;
    return groups;
  } catch (err) {
    throw new Error(err.message);
  }
}

// export async function getGroupShares(groupId) {
//   try {
//     if (!groupId) throw new Error('No groupId is provided');

//     const data = await fetch(`${url}groups/${groupId}/shares`, {
//       method: 'GET',
//       credentials: 'include',
//     });
//     const groupShares = await data.json();
//     return groupShares;
//   } catch (error) {
//     console.error(`Error while fetching group shares: ${error.message}`);
//     throw error;
//   }
// }

// export async function getGroupMembers(groupId) {
//   const data = await fetch(`${url}groups/${groupId}`, {
//     method: 'GET',
//     credentials: 'include',
//   });

//   const group = await data.json();
//   return group.data.doc.members;
// }

// export async function createGroup(formData) {
//   try {
//     const res = await fetch(`${url}groups/startNewGroup`, {
//       method: 'POST',
//       credentials: 'include',
//       body: formData,
//     });
//     const resData = await res.json();

//     if (resData.status === 'error')
//       throw new Error(resData.error.errors.groupName.message);

//     return resData;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// }
