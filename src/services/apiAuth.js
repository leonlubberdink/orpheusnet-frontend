import axios, { axioPrivate, setHeaderToken } from './axios';

const SIGNUP_URL = '/users/signup';
const LOGIN_URL = '/users/login';
const LOGOUT_URL = '/users/logout';
const FORGOT_PASSWORD_URL = '/users/forgotPassword';
const RESET_PASSWORD_URL = '/users/resetPassword';

export async function signup(formData) {
  const {
    userName,
    email,
    password,
    passwordConfirm,
    userImage,
    groupToSignupFor,
  } = formData;

  const formDataObj = new FormData();
  formDataObj.append('userName', userName);
  formDataObj.append('email', email);
  formDataObj.append('password', password);
  formDataObj.append('passwordConfirm', passwordConfirm);

  if (groupToSignupFor !== '')
    formDataObj.append('groupToSignupFor', groupToSignupFor);

  if (userImage) {
    formDataObj.append('userImage', userImage, userImage.name);
  }

  const signedUpUser = await axios.post(SIGNUP_URL, formDataObj, {
    withCredentials: true,
  });

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
      headers: { 'Content-Type': 'application/json' },
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

export async function forgotPassword(formData) {
  const { email } = formData;

  const res = await axios.post(
    FORGOT_PASSWORD_URL,
    JSON.stringify({
      email,
    }),
    {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    }
  );

  return res;
}

export async function resetPassword(formData, resetToken) {
  try {
    const res = await axios.patch(
      `${RESET_PASSWORD_URL}/${resetToken}`,
      JSON.stringify(formData),
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    return res;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
