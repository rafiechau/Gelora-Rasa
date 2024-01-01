import {
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  GET_ALL_MY_ORDER,
  RESET_DELETE_SUCCESS,
  SET_ALL_MY_ORDER,
} from './constants';

export const actionGetAllMyOrders = () => ({
  type: GET_ALL_MY_ORDER,
});

export const actionSetAllMyOrders = (allMyOrders) => ({
  type: SET_ALL_MY_ORDER,
  allMyOrders,
});

export const actionDeleteOrderById = (orderId) => ({
  type: DELETE_ORDER,
  payload: { orderId },
});

export const actionDeleteOrderSuccess = (orderId) => ({
  type: DELETE_ORDER_SUCCESS,
  payload: orderId,
});

export const resetDeleteSuccess = () => ({
  type: RESET_DELETE_SUCCESS,
});
