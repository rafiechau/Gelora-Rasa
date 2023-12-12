import { setLoading, showPopup } from '@containers/App/actions';
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getCategoriesApi, getEventApi, getLocationApi } from '@domain/api';
import { actionSetAllCategories, actionSetAllLocation, setAllEvent } from './actions';
import { GET_ALL_CATEGORIES, GET_ALL_EVENT, GET_ALL_LOCATION } from './constants';

export function* doGetAllEvent(action) {
  yield put(setLoading(true));
  try {
    const { token, page } = action.payload;
    const response = yield call(getEventApi, token, page);
    yield put(setAllEvent(response.events));
  } catch (error) {
    console.log(error);
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  } finally {
    yield put(setLoading(false));
  }
}

export function* doGetAllCategories() {
  yield put(setLoading(true));
  try {
    const response = yield call(getCategoriesApi);
    yield put(actionSetAllCategories(response.data));
  } catch (error) {
    console.log(error);
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  } finally {
    yield put(setLoading(false));
  }
}

export function* doGetAllLocation() {
  yield put(setLoading(true));
  try {
    const response = yield call(getLocationApi);
    yield put(actionSetAllLocation(response.data));
  } catch (error) {
    console.log(error);
    if (error?.response?.status === 400 || error?.response?.status === 404) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  } finally {
    yield put(setLoading(false));
  }
}

export default function* homeSaga() {
  yield takeLatest(GET_ALL_EVENT, doGetAllEvent);
  yield takeLatest(GET_ALL_LOCATION, doGetAllLocation);
  yield takeLatest(GET_ALL_CATEGORIES, doGetAllCategories);
}
