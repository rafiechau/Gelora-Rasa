import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { setLoading } from '@containers/App/actions';
import { getMyOrdersApi } from '@domain/api';
import { GET_ALL_MY_ORDER } from './constants';
import { actionSetAllMyOrders } from './actions';

export function* doGetMyOrders(action) {
  yield put(setLoading(true));
  try {
    const { token } = action.payload;
    const response = yield call(getMyOrdersApi, token);
    yield put(actionSetAllMyOrders(response.data));
  } catch (error) {
    toast.error('Error fetching my posts');
  } finally {
    yield put(setLoading(false));
  }
}

// mungkin bakal diganti nanti
export function* myOrdersSaga() {
  yield takeLatest(GET_ALL_MY_ORDER, doGetMyOrders);
}
