import { axioPrivate } from './axios';

export async function getMyGroups(userId) {
  try {
    const myGroupsData = await axioPrivate.get(`/users/${userId}/groups`, {
      headers: { 'Content-Type': 'application/json' },
    });
    const { data: groups } = myGroupsData.data.data;
    return groups;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getGroup(groupId) {
  try {
    const groupData = await axioPrivate.get(`/groups/${groupId}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    const { doc: group } = groupData.data.data;
    return group;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function createGroup(formData) {
  const { groupName, groupImage } = formData;

  const formDataObj = new FormData();
  formDataObj.append('groupName', groupName);

  if (groupImage) {
    formDataObj.append('groupImage', groupImage, groupImage.name);
  }

  try {
    const res = await axioPrivate.post(`/groups/startNewGroup`, formDataObj, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    });

    console.log(res);

    return res;
  } catch (error) {
    throw new Error(error.message);
  }
}
