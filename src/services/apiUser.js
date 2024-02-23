import { axioPrivate } from './axios';

export async function getMe() {
  try {
    const res = await axioPrivate.get(`/users/me`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateMe(newUserInfo) {
  const { email } = newUserInfo;

  try {
    const res = await axioPrivate.patch(
      `/users/updateMe`,
      { email },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updatePassword(updatedPassword) {
  try {
    const res = await axioPrivate.patch(
      `/users/updateMyPassword`,
      updatedPassword,
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateImage(image) {
  const formDataObj = new FormData();

  formDataObj.append('userImage', image, image.name);

  try {
    const res = await axioPrivate.patch(`/users/updateMyImage`, formDataObj, {
      withCredentials: true,
    });
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function deleteMe() {
  try {
    const res = await axioPrivate.delete(`/users/deleteMe`, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    });

    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}
