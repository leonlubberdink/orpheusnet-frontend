import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

import { refreshAuth } from './apiAuth';

const baseUrl =
  import.meta.env.VITE_NODE_ENV === 'development'
    ? import.meta.env.VITE_ORPHEUS_API_URL_DEV
    : import.meta.env.VITE_ORPHEUS_API_URL_PROD;

const API_URL = `${baseUrl}/api/${import.meta.env.VITE_ORPHEUS_API_VERSION}/`;

export default axios.create({
  baseURL: API_URL,
});

export const axioPrivate = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const setHeaderToken = (token) => {
  axioPrivate.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
  delete axioPrivate.defaults.headers.common.Authorization;
};

createAuthRefreshInterceptor(axioPrivate, refreshAuth, {
  statusCodes: [401], // default: [ 401 ]
  pauseInstanceWhileRefreshing: true,
});
