import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { setLoading } from '@containers/App/actions';
import { createEventOrganizerApi } from '@domain/api';
import { setToken, setUser } from '@containers/Client/actions';
import { jwtDecode } from 'jwt-decode';
import { CREATE_EVENT_ORGANIZER } from './constants';

function* doCreateEventOrganizer(action) {
  yield put(setLoading(true));
  try {
    console.log(action)
    const response = yield call(createEventOrganizerApi, action.payload.data, action.payload.token);
    console.log(response);
    yield put(setToken(response.token));
    const { role, id } = jwtDecode(response.token);
    yield put(setUser(role, id));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* createEventOrganizerSaga() {
  yield takeLatest(CREATE_EVENT_ORGANIZER, doCreateEventOrganizer);
}
