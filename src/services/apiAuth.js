import axios from './axios';
const SIGNUP_URL = '/users/signup';
const LOGIN_URL = '/users/login';

export async function signup(formData) {
  const { userName, email, password, passwordConfirm } = formData;
  const signedUpUser = await axios.post(
    SIGNUP_URL,
    JSON.stringify({
      userName,
      email,
      password,
      passwordConfirm,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );

  return signedUpUser.data;
}

export async function login(formData) {
  const { userName, password } = formData;

  const loggedInUser = await axios.post(
    LOGIN_URL,
    JSON.stringify({
      userName,
      password,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );

  return loggedInUser;
}

export async function isLoggedIn() {
  const res = await fetch(`${url}api/v1/users/isLoggedIn`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  const { data } = await res.json();

  return data;
}
