import {
  IS_VERIFY,
  LOGIN_REQUEST,
  LOGOUT_USER,
  REGISTER_REQUEST,
  RESET_REGISTER_STEP,
  SEND_OTP,
  SEND_VERIFY_EMAIL,
  SET_EMAIL,
  SET_EXPIRE_TIME,
  SET_LOGIN,
  SET_STEP,
  SET_TOKEN,
  SET_TOKEN_VERIFY,
  SET_USER,
} from '@containers/Client/constants';

export const setLogin = (login) => ({
  type: SET_LOGIN,
  login,
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const setUser = (user) => ({
  type: SET_USER,
  user,
});

export const actionHandleLogin = (data, callback) => ({
  type: LOGIN_REQUEST,
  data,
  callback,
});

export const actionHandleRegister = (data, callback) => ({
  type: REGISTER_REQUEST,
  data,
  callback,
});
export const actionSetStep = (step) => ({
  type: SET_STEP,
  step,
});
export const actionSetEmail = (email) => ({
  type: SET_EMAIL,
  email,
});
export const actionSetExpire = (expire) => ({
  type: SET_EXPIRE_TIME,
  expire,
});
export const actionSetVerify = (isVerify) => ({
  type: IS_VERIFY,
  isVerify,
});
export const actionSetTokenVerify = (token) => ({
  type: SET_TOKEN_VERIFY,
  token,
});
export const actionHandleSendEmailVerify = (data) => ({
  type: SEND_VERIFY_EMAIL,
  data,
});
export const actionHandleSendOTP = (data) => ({
  type: SEND_OTP,
  data,
});
export const actionHandleResetRegister = () => ({
  type: RESET_REGISTER_STEP,
});

export const actionLogoutUser = (callback) => ({
  type: LOGOUT_USER,
  callback,
});
