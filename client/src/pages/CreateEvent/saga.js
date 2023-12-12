import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { createEventApi } from '@domain/api';
import { CREATE_EVENT } from './constants';

function* doCreateEvent(action) {
  yield put(setLoading(true));
  try {
    console.log(action);
    const response = yield call(createEventApi, action.payload.data, action.payload.token);
    // yield put(getAllPosts(getPostsApi));
    // yield put(getMyPost(getMyPostsApi));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* createEventSaga() {
  yield takeLatest(CREATE_EVENT, doCreateEvent);
}
