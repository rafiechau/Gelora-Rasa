import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { getEventByIdApi } from '@domain/api';
import { GET_EVENT_BY_ID } from './constants';
import { setEventById } from './actions';

export function* doGetEventById(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getEventByIdApi, action.eventId);
    yield put(setEventById(response));
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* detailSaga() {
  yield takeLatest(GET_EVENT_BY_ID, doGetEventById);
}
