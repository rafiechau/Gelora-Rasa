import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoading, showPopup } from '@containers/App/actions';
import { apiHandleEditPhotoProfile, apiHandleEditProfile, apiHandleGetProfile, deleteAccountApi } from '@domain/api';
import config from '@config/index';
import { actionLogoutUser } from '@containers/Client/actions';
import { DELETE_ACCOUNT, EDIT_PHOTO_PROFILE, EDIT_PROFILE, GET_PROFILE } from './constants';
import { actionSetProfile } from './actions';

function* sagaHandleGetUser() {
  yield put(setLoading(true));
  try {
    const response = yield call(apiHandleGetProfile);
    yield put(actionSetProfile(response.data));
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}
function* sagaHandleEditPhotoProfile({ data }) {
  yield put(setLoading(true));
  try {
    const response = yield call(apiHandleEditPhotoProfile, { image: data });
    yield put(actionSetProfile(response.data));
    toast.success(response.message);
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

function* sagaHandleEditProfile({ data, callback }) {
  yield put(setLoading(true));
  try {
    if (data?.new_password) {
      data.new_password = CryptoJS.AES.encrypt(data.new_password, config.api.cryto).toString();
    }
    const response = yield call(apiHandleEditProfile, data);
    toast.success(response.message);
    yield put(actionSetProfile(response.data));
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

function* doDeleteAccount(action) {
  yield put(setLoading(true));
  try {
    const { callback } = action;
    const response = yield call(deleteAccountApi);
    yield put(actionLogoutUser(callback));
    toast.success(response.message);
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  }
  yield put(setLoading(false));
}

export default function* profileSaga() {
  yield takeLatest(GET_PROFILE, sagaHandleGetUser);
  yield takeLatest(EDIT_PHOTO_PROFILE, sagaHandleEditPhotoProfile);
  yield takeLatest(EDIT_PROFILE, sagaHandleEditProfile);
  yield takeLatest(DELETE_ACCOUNT, doDeleteAccount);
}
