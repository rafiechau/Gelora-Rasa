import { createEventApi, deleteEventByIdApi, getMyEventApi, updateEventByIdApi, updateStatusEventByIdApi } from '@domain/api';
import toast from 'react-hot-toast';
import { setLoading } from '@containers/App/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { CREATE_EVENT, DELETE_EVENT, GET_ALL_MY_EVENT, UPDATE_EVENT_BY_ID, UPDATE_EVENT_EVENT_ORGANIZER } from './constants';
import { actionDeleteMyEventSuccess, actionGetAllMyEvent, actionSetAllMyEvent } from './actions';

export function* doGetMyEvents(action) {
  yield put(setLoading(true));
  try {
    const { token } = action.payload;
    const response = yield call(getMyEventApi, token);
    yield put(actionSetAllMyEvent(response.data));
  } catch (error) {
    console.log(error)
    toast.error('Error fetching my posts');
  } finally {
    yield put(setLoading(false));
  }
}

function* doUpdateEvent(action) {
  yield put(setLoading(true));
  try {
    const { eventId, data, token } = action.payload;
    const response = yield call(updateStatusEventByIdApi, eventId, data, token);
    console.log(response);
    yield put(actionGetAllMyEvent(getMyEventApi));
    toast.success(response.message);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

function* doUpdateEventEO(action) {
  yield put(setLoading(true));
  try {
    console.log(action, "test")
    const { eventId, data, token } = action.payload;
    const response = yield call(updateEventByIdApi, eventId, data, token);
    console.log(response)
    yield put(actionGetAllMyEvent(getMyEventApi));
    toast.success(response.message);
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export function* doDeleteEvent(action) {
  try {
    const { eventId, token } = action.payload;
    const response = yield call(deleteEventByIdApi, eventId, token);
    yield put(actionDeleteMyEventSuccess(eventId));
    yield put(actionGetAllMyEvent(getMyEventApi));
    toast.success(response.message);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
}

function* doCreateEvent(action) {
  yield put(setLoading(true));
  try {
    console.log(action);
    const response = yield call(createEventApi, action.payload.data, action.payload.token);
    yield put(actionGetAllMyEvent(getMyEventApi));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

// mungkin bakal diganti nanti
export function* myEventSaga() {
  yield takeLatest(GET_ALL_MY_EVENT, doGetMyEvents);
  yield takeLatest(UPDATE_EVENT_BY_ID, doUpdateEvent);
  yield takeLatest(DELETE_EVENT, doDeleteEvent);
  yield takeLatest(CREATE_EVENT, doCreateEvent);
  yield takeLatest(UPDATE_EVENT_EVENT_ORGANIZER, doUpdateEventEO);
}
