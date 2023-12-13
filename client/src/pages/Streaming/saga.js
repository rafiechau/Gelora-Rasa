import { setLoading } from '@containers/App/actions';
import { createMeetingIdAPI } from '@domain/api';
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_MEETING_ID } from './constants';

function* doCreateMeeting(action) {
  yield put(setLoading(true));
  try {
    console.log(action)
    const response = yield call(createMeetingIdAPI, action.payload.data, action.payload.token);
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export function* streamingSaga() {
  yield takeLatest(CREATE_MEETING_ID, doCreateMeeting);
}
