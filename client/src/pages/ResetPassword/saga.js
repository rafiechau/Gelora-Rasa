import config from '@config/index';
import { setLoading, showPopup } from '@containers/App/actions';
import { apiHandleResetForgotPassword } from '@domain/api';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { SEND_RESET_PASSWORD } from './constants';

function* sendResetPassword({ data, callback }) {
  yield put(setLoading(true));
  try {
    data.new_password = CryptoJS.AES.encrypt(data.new_password, config.api.cryto).toString();
    const response = yield call(apiHandleResetForgotPassword, data);
    toast.success(response.message);
    yield call(callback);
  } catch (error) {
    if (error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

export default function* resetPasswordSaga() {
  yield takeLatest(SEND_RESET_PASSWORD, sendResetPassword);
}
