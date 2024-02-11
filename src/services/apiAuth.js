import axios, { axioPrivate, setHeaderToken } from './axios';

const SIGNUP_URL = '/users/signup';
const LOGIN_URL = '/users/login';
const LOGOUT_URL = '/users/logout';

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

export async function logout() {
  const logoutRes = await axios.get(LOGOUT_URL, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  return logoutRes;
}

async function refreshToken() {
  try {
    const res = await axioPrivate.get('/users/refreshToken', {
      withCredentials: true,
    });

    const { data } = res;

    return data;
  } catch (err) {
    return err;
  }
}

export async function refreshAuth(failedRequest) {
  const data = await refreshToken();

  if (data.status === 'success') {
    failedRequest.response.config.headers.Authorization =
      'Bearer ' + data.accessToken;
    setHeaderToken(data.accessToken);
    return Promise.resolve(data.accessToken);
  } else {
    throw new Error(data.message);
  }
}
