import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import updateOrderStatusApi, { createOrderApi, getEventByIdApi } from '@domain/api';
import { CREATE_ORDER, GET_EVENT_BY_ID, UPDATE_ORDER_STATUS } from './constants';
import { setEventById } from './actions';

export function* doGetEventById(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(getEventByIdApi, action.eventId);
    yield put(setEventById(response));
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export function* doCreateOrder(action) {
  yield put(setLoading(true));
  try {
    const { callback } = action.payload
    const { eventId, totalTickets, ticketsTypes } = action.payload.data;
    const { token } = action.payload;
    const response = yield call(createOrderApi, eventId, { totalTickets, ticketsTypes }, token);
    console.log(response, 'tis');
    window.snap.pay(response.token, {
      onSuccess(result) {
        toast.success('Payment successful!');
        console.log(response.order.id);
        console.log(callback)
        // Gunakan result untuk mendapatkan detail transaksi, seperti order_id
        if (callback) callback(response.order.id, 'lunas', token);
      },
      onPending(result) {
        toast.error('Payment pending!');
        // Anda dapat menggunakan result untuk detail lebih lanjut jika diperlukan
      },
      onError(result) {
        toast.error('Payment error!');
        // Anda dapat menggunakan result untuk detail lebih lanjut jika diperlukan
      },
      onClose() {
        toast.error('You closed the popup without finishing the payment!');
      },
    });
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

function* doUpdateOrderStatusSaga({ orderId, status, token, callback }) {
  yield put(setLoading(true));
  try {
    console.log(orderId)
    const response = yield call(updateOrderStatusApi, orderId, status, token);
    if (response?.data?.status === 'settlement') {
      callback && callback();
    }
    // Handle success, e.g., update local state or dispatch another action
    console.log(response, 'update order');
    toast.success('Order status updated successfully!');
  } catch (error) {
    console.log('error');
    toast.error('Error updating order status');
  } finally {
    yield put(setLoading(false));
  }
}

export default function* detailSaga() {
  yield takeLatest(GET_EVENT_BY_ID, doGetEventById);
  yield takeLatest(CREATE_ORDER, doCreateOrder);
  yield takeLatest(UPDATE_ORDER_STATUS, doUpdateOrderStatusSaga);
}
