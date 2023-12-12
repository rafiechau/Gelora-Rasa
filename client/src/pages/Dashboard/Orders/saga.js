import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { setLoading } from '@containers/App/actions';
import { deleteMyOrderApi, getMyOrdersApi } from '@domain/api';
import { DELETE_ORDER, GET_ALL_MY_ORDER } from './constants';
import { actionDeleteOrderSuccess, actionGetAllMyOrders, actionSetAllMyOrders } from './actions';
import { actionDeleteLocationSuccess } from '../Locations/actions';

export function* doGetMyOrders(action) {
  yield put(setLoading(true));
  try {
    const { token } = action.payload;
    const response = yield call(getMyOrdersApi, token);
    yield put(actionSetAllMyOrders(response.data));
  } catch (error) {
    console.log(error)
    toast.error('Error fetching my orders');
  } finally {
    yield put(setLoading(false));
  }
}

export function* doDeleteMyOrder(action) {
  try {
    console.log(action)
    const { orderId, token } = action.payload;
    const response = yield call(deleteMyOrderApi, orderId, token);
    yield put(actionDeleteOrderSuccess(orderId));
    yield put(actionGetAllMyOrders(getMyOrdersApi));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

// mungkin bakal diganti nanti
export function* dashboardOrdersSaga() {
  yield takeLatest(GET_ALL_MY_ORDER, doGetMyOrders);
  yield takeLatest(DELETE_ORDER, doDeleteMyOrder);
}
