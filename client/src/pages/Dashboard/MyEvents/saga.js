import { deleteEventByIdApi, getMyEventApi, updateEventByIdApi } from '@domain/api';
import toast from 'react-hot-toast';
import { setLoading } from '@containers/App/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { DELETE_EVENT, GET_ALL_MY_EVENT, UPDATE_EVENT_BY_ID } from './constants';
import { actionSetAllMyEvent } from './actions';

export function* doGetMyEvents(action) {
  yield put(setLoading(true));
  try {
    const { token } = action.payload;
    const response = yield call(getMyEventApi, token);
    yield put(actionSetAllMyEvent(response.data));
  } catch (error) {
    toast.error('Error fetching my posts');
  } finally {
    yield put(setLoading(false));
  }
}

function* doUpdateEvent(action) {
  yield put(setLoading(true));
  try {
    const { eventId, data, token } = action.payload;
    const response = yield call(updateEventByIdApi, eventId, data, token);
    // yield put(getMyPost(getMyPostsApi));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export function* doDeleteEvent(action) {
  try {
    const { eventId, token } = action.payload;
    const response = yield call(deleteEventByIdApi, eventId, token);
    // yield put(deletePostSuccess(action.payload.postId));
    // yield put(getMyPost(getMyPostsApi));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

// mungkin bakal diganti nanti
export function* myEventSaga() {
  yield takeLatest(GET_ALL_MY_EVENT, doGetMyEvents);
  yield takeLatest(UPDATE_EVENT_BY_ID, doUpdateEvent);
  yield takeLatest(DELETE_EVENT, doDeleteEvent);
}
