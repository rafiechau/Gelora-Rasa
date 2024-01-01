import axios from 'axios';

import store from '@store';
import { actionLogoutUser } from '@containers/Client/actions';

axios.interceptors.request.use((reqConfig) => {
  const state = store.getState();
  const { token } = state.client;
  if (token) {
    reqConfig.headers.Authorization = `Bearer ${token}`;
  }
  return reqConfig;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { dispatch } = store;
    if (error.response?.status === 401) {
      dispatch(actionLogoutUser(() => window.location.href('/login')));
    }
    return Promise.reject(error);
  }
);

const request = (options) => axios(options);

export default request;
