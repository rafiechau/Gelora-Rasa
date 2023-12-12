import { GET_ALL_MY_ORDER, SET_ALL_MY_ORDER } from './constants';

export const actionGetAllMyOrders = (token) => ({
  type: GET_ALL_MY_ORDER,
  payload: { token },
});

export const actionSetAllMyOrders = (allMyEvent) => ({
  type: SET_ALL_MY_ORDER,
  allMyEvent,
});
