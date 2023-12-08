import { setLoading, showPopup } from '@containers/App/actions';
import { apiHandleSendForgotPassword } from '@domain/api';
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { FORGOT_PASSWORD } from './constants';

function* sagaHandleSendEmailForgot({ data, callback }) {
  yield put(setLoading(true));
  try {
    const response = yield call(apiHandleSendForgotPassword, data);
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

export default function* forgotPasswordSaga() {
  yield takeLatest(FORGOT_PASSWORD, sagaHandleSendEmailForgot);
}
