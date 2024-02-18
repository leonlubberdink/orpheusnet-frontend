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

export async function updateMe() {
  try {
    const res = await axioPrivate.get(`/users/me`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return res;
  } catch (err) {
    throw new Error(err.message);
  }
}
