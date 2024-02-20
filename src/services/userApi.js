import { axioPrivate } from './axios';

export async function getMe() {
  try {
    const res = await axioPrivate.get(`/users/me`, {
      headers: { 'Content-Type': 'application/json' },
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
      }
    );

    console.log();

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
      }
    );

    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}
