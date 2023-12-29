import { setLoading, showPopup } from '@containers/App/actions';
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { getCategoriesApi, getEventApi, getLocationApi } from '@domain/api';
import { actionSetAllCategories, actionSetAllLocation, setPaginatedPosts } from './actions';
import { GET_ALL_CATEGORIES, GET_ALL_LOCATION, GET_PAGINATED_EVENT } from './constants';

export function* doGetAllEvent(action) {
  yield put(setLoading(true));
  try {
    const { page, pageSize } = action.payload;
    const response = yield call(getEventApi, page, pageSize);
    yield put(
      setPaginatedPosts({
        events: response.events,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
      })
    );
  } catch (error) {
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
  yield takeLatest(GET_PAGINATED_EVENT, doGetAllEvent);
  yield takeLatest(GET_ALL_LOCATION, doGetAllLocation);
  yield takeLatest(GET_ALL_CATEGORIES, doGetAllCategories);
}
