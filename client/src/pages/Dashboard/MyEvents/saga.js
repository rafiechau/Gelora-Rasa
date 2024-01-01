import {
  createEventApi,
  deleteEventByIdApi,
  getAllUserOrderEvent,
  getMyEventApi,
  updateEventByIdApi,
  updateStatusEventByIdApi,
} from '@domain/api';
import toast from 'react-hot-toast';
import { setLoading, showPopup } from '@containers/App/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  CREATE_EVENT,
  DELETE_EVENT,
  GET_ALL_MY_EVENT,
  GET_ALL_MY_ORDER_USER,
  UPDATE_EVENT_BY_ID,
  UPDATE_EVENT_EVENT_ORGANIZER,
} from './constants';
import {
  actionDeleteMyEventSuccess,
  actionGetAllMyEvent,
  actionSetAllEventOrder,
  actionSetAllMyEvent,
} from './actions';

export function* doGetMyEvents() {
  yield put(setLoading(true));
  try {
    const response = yield call(getMyEventApi);
    yield put(actionSetAllMyEvent(response.data));
  } catch (error) {
    console.log(error)
    if (error?.response?.status === 400 || error?.response?.status === 404 || error?.response?.status === 403) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  } finally {
    yield put(setLoading(false));
  }
}

export function* doGetMyEventOrderUser(action) {
  yield put(setLoading(true));
  try {
    const { eventId } = action.payload;
    const response = yield call(getAllUserOrderEvent, eventId);
    yield put(actionSetAllEventOrder(response));
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404 || error?.response?.status === 403) {
      toast.error(error.response.data.message);
    } else {
      yield put(showPopup());
    }
  } finally {
    yield put(setLoading(false));
  }
}

function* doUpdateEvent(action) {
  yield put(setLoading(true));
  try {
    const { eventId, data } = action.payload;
    const response = yield call(updateStatusEventByIdApi, eventId, data);
    yield put(actionGetAllMyEvent(getMyEventApi));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

function* doUpdateEventEO(action) {
  yield put(setLoading(true));
  try {
    const { eventId, data } = action.payload;
    const response = yield call(updateEventByIdApi, eventId, data);
    yield put(actionGetAllMyEvent(getMyEventApi));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export function* doDeleteEvent(action) {
  try {
    const { eventId } = action.payload;
    const response = yield call(deleteEventByIdApi, eventId);
    yield put(actionDeleteMyEventSuccess(eventId));
    yield put(actionGetAllMyEvent(getMyEventApi));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

function* doCreateEvent(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(createEventApi, action.payload.data);
    yield put(actionGetAllMyEvent(getMyEventApi));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export function* myEventSaga() {
  yield takeLatest(GET_ALL_MY_EVENT, doGetMyEvents);
  yield takeLatest(GET_ALL_MY_ORDER_USER, doGetMyEventOrderUser);
  yield takeLatest(UPDATE_EVENT_BY_ID, doUpdateEvent);
  yield takeLatest(DELETE_EVENT, doDeleteEvent);
  yield takeLatest(CREATE_EVENT, doCreateEvent);
  yield takeLatest(UPDATE_EVENT_EVENT_ORGANIZER, doUpdateEventEO);
}
