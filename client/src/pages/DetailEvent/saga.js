/* eslint-disable no-unused-vars */
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoading, showPopup } from '@containers/App/actions';
import {
  createOrderEvent,
  getEventByIdApi,
  hasUserOrderedEventApi,
  initialPayementApi,
  updateStatusEventByIdApi,
} from '@domain/api';
import {
  CHECK_USER_ORDER,
  CREATE_ORDER_EVENT,
  GET_EVENT_BY_ID,
  INITIAL_PAYMENT,
  UPDATE_EVENT_STATUS,
} from './constants';
import { setEventById, setUserOrderStatus } from './actions';

export function* doGetEventById(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getEventByIdApi, action.eventId, action.token);
    yield put(setEventById(response));
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

function* doInitialPayment(action) {
  yield put(setLoading(true));
  try {
    const { cbSuccess } = action;
    const response = yield call(initialPayementApi, action.eventId, action.token, action.data);
    window.snap.pay(response?.token, {
      onSuccess: (result) => {
        if (cbSuccess)
          cbSuccess(
            {
              eventId: action.eventId,
              totalTickets: action.data.totalTickets,
              ticketsTypes: action.data.ticketsTypes,
            },
            action.token
          );
        toast.success('Payment successful!');
      },
      onPending(result) {
        toast.error('Payment pending!');
      },
      onError(result) {
        toast.error('Payment error!');
      },
      onClose() {
        toast.error('You closed the popup without finishing the payment!');
      },
    });
  } catch (error) {
    console.log(error);
    yield put(showPopup('Sorry :(', 'Please Login or Register for book venue'));
  }
  yield put(setLoading(false));
}

function* doCreateOrder({ token, data, cbSuccess }) {
  yield put(setLoading(true));
  try {
    console.log(cbSuccess);
    const response = yield call(createOrderEvent, token, data);
    console.log(response?.data?.status);
    toast.success('Order status updated successfully!');
    cbSuccess && cbSuccess();
  } catch (error) {
    console.log(error);
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
}

function* doCheckUserOrder(action) {
  try {
    const response = yield call(hasUserOrderedEventApi, action.eventId, action.token);
    yield put(setUserOrderStatus(response.hasOrdered));
  } catch (error) {
    console.log(error);
    toast.error('Error checking order status');
  }
}

function* doUpdateEventStatusSaga({ eventId, status, token }) {
  yield put(setLoading(true));
  try {
    const response = yield call(updateStatusEventByIdApi, eventId, status, token);
    yield put(setEventById(response.data, eventId));
    toast.success(response.message);
  } catch (error) {
    console.log(error);
    toast.error('Error updating event status');
  } finally {
    yield put(setLoading(false));
  }
}

export default function* detailSaga() {
  yield takeLatest(GET_EVENT_BY_ID, doGetEventById);
  yield takeLatest(INITIAL_PAYMENT, doInitialPayment);
  yield takeLatest(CREATE_ORDER_EVENT, doCreateOrder);
  yield takeLatest(UPDATE_EVENT_STATUS, doUpdateEventStatusSaga);
  yield takeLatest(CHECK_USER_ORDER, doCheckUserOrder);
}
