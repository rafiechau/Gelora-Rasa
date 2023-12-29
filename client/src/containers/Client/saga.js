import CryptoJS from 'crypto-js';

import { setLoading, showPopup } from '@containers/App/actions';
import toast from 'react-hot-toast';
import { apiHandleCheckOtpVerifyEmail, apiHandleLogin, apiHandleRegister, apiHandleSendVerifyEmail } from '@domain/api';
import { call, put, takeLatest } from 'redux-saga/effects';
import config from '@config/index';
import { jwtDecode } from 'jwt-decode';
import {
  actionSetEmail,
  actionSetExpire,
  actionSetStep,
  actionSetTokenVerify,
  actionSetVerify,
  setLogin,
  setToken,
  setUser,
} from './actions';
import { LOGIN_REQUEST, REGISTER_REQUEST, SEND_OTP, SEND_VERIFY_EMAIL } from './constants';

function* sagaHandleSendVerifyEmail({ data }) {
  yield put(setLoading(true));
  try {
    const response = yield call(apiHandleSendVerifyEmail, data);
    toast.success(response?.message);
    yield put(actionSetVerify(false));
    yield put(actionSetStep(1));
    yield put(actionSetTokenVerify(response.data.token));
    yield put(actionSetExpire(response.data.expire));
    yield put(actionSetEmail(data.email));
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* sagaHandleSendOTP({ data }) {
  yield put(setLoading(true));
  try {
    const response = yield call(apiHandleCheckOtpVerifyEmail, data);
    toast.success(response?.message);
    yield put(actionSetStep(2));
    yield put(actionSetVerify(true));
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404 || error?.response.status === 401) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* sagaHandleRegister({ data, callback }) {
  yield put(setLoading(true));
  try {
    // console.log(data.password);
    data.password = CryptoJS.AES.encrypt(data.password, config.api.cryto).toString();
    data.confirmPassword = CryptoJS.AES.encrypt(data.confirmPassword, config.api.cryto).toString();
    const response = yield call(apiHandleRegister, data);
    toast.success(response?.message);
    yield call(callback);
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* sagaHandleLogin({ data, callback }) {
  yield put(setLoading(true));
  try {
    data.password = CryptoJS.AES.encrypt(data.password, config.api.cryto).toString();
    const response = yield call(apiHandleLogin, data);
    yield call(callback);
    yield put(setLogin(true));
    yield put(setToken(response.token));
    const { role, id, firstName } = jwtDecode(response.token);
    yield put(setUser({ role, id, firstName }));
    toast.success(response.message);
  } catch (error) {
    if (error?.response?.status === 400) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

export default function* AuthenticationSaga() {
  yield takeLatest(SEND_VERIFY_EMAIL, sagaHandleSendVerifyEmail);
  yield takeLatest(SEND_OTP, sagaHandleSendOTP);
  yield takeLatest(REGISTER_REQUEST, sagaHandleRegister);
  yield takeLatest(LOGIN_REQUEST, sagaHandleLogin);
}
