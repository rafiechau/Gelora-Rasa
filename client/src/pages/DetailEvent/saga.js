import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoading, showPopup } from '@containers/App/actions';
import { createOrderEvent, getEventByIdApi, initialPayementApi, updateStatusEventByIdApi } from '@domain/api';
import { CREATE_ORDER_EVENT, GET_EVENT_BY_ID, INITIAL_PAYMENT, UPDATE_EVENT_STATUS } from './constants';
import { setEventById } from './actions';

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
    console.log(action, '<<<Action');
    const { cbSuccess } = action;
    console.log(cbSuccess, 'ini callback');
    const response = yield call(initialPayementApi, action.eventId, action.token, action.data);
    console.log(response);
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
    console.log(token, 'create token');
    console.log(data, 'create order');
    console.log(cbSuccess, 'create order');
    const response = yield call(createOrderEvent, token, data);
    if (response?.data?.status === 'settlement') {
      cbSuccess && cbSuccess();
    }
    // Handle success, e.g., update local state or dispatch another action
    console.log(response, 'update order');
    toast.success('Order status updated successfully!');
  } catch (error) {
    console.log(error);
    yield put(showPopup('Sorry :(', error.response.data.status));
  }
  yield put(setLoading(false));
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
}
