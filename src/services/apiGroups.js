import { axioPrivate } from './axios';

export async function createGroup(formData) {
  const { groupName, groupImage } = formData;

  const formDataObj = new FormData();
  formDataObj.append('groupName', groupName);

  if (groupImage) {
    formDataObj.append('groupImage', groupImage, groupImage.name);
  }

  try {
    const res = await axioPrivate.post(`/groups/startNewGroup`, formDataObj, {
      withCredentials: true,
    });

    return res;
  } catch (error) {
    throw new Error(error.message);
  }
}

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
  console.log('GET GROUP');
  try {
    const groupData = await axioPrivate.get(`/groups/${groupId}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    const { group } = groupData.data.data;
    return group;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function inviteMember({ selectedGroupId, userOrMail }) {
  const body = { user: userOrMail };
  try {
    const response = await axioPrivate.post(
      `/groups/inviteMember/${selectedGroupId}`,
      body,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.status;
  } catch (err) {
    throw new Error(err.response.data.error.message);
  }
}

export async function getInvites(userId) {
  try {
    const res = await axioPrivate.get(`/users/invites/${userId}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    return res.data.receivedInvites;
  } catch (err) {
    throw new Error(err.message);
  }
}

//UserId hoeft niet mee? Word al meegestuurd mit token

export async function respondToInvite({ hasAcceptedInvite, userId, groupId }) {
  const body = { hasAcceptedInvite, userId, groupId };
  try {
    const response = await axioPrivate.post(`/groups/respondToInvite`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.status;
  } catch (err) {
    console.log(err.response.data);
    throw new Error(err.response.data.error.message);
  }
}
