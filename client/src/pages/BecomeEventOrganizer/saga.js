import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { setLoading } from '@containers/App/actions';
import { createEventOrganizerApi } from '@domain/api';
import { actionLogoutUser } from '@containers/Client/actions';
import { CREATE_EVENT_ORGANIZER } from './constants';

function* doCreateEventOrganizer(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(createEventOrganizerApi, action.payload.data, action.payload.token);
    toast.success('please login again');
    yield put(actionLogoutUser(action.payload.callback));
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* createEventOrganizerSaga() {
  yield takeLatest(CREATE_EVENT_ORGANIZER, doCreateEventOrganizer);
}
