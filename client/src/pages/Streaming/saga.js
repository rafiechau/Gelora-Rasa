import { setLoading } from '@containers/App/actions';
import { createMeetingIdAPI, verifyUserForMeetingApi } from '@domain/api';
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_MEETING_ID, VERIFY_USER_FOR_MEETING } from './constants';

function* doCreateMeeting(action) {
  yield put(setLoading(true));
  try {
    console.log(action);
    const response = yield call(createMeetingIdAPI, action.payload.data, action.payload.token);
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

function* doVerifyUserForMeeting(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(verifyUserForMeetingApi, action.payload.eventId, action.payload.token);
    if (response.isValid) {
      action.payload.callback();
    } else {
      toast.error('You do not have access to this meeting.');
    }
  } catch (error) {
    toast.error('Failed to verify the user.');
  } finally {
    yield put(setLoading(false));
  }
}

export function* streamingSaga() {
  yield takeLatest(CREATE_MEETING_ID, doCreateMeeting);
  yield takeLatest(VERIFY_USER_FOR_MEETING, doVerifyUserForMeeting);
}
