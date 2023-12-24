import {
  CHECK_USER_ORDER,
  CREATE_ORDER_EVENT,
  GET_EVENT_BY_ID,
  INITIAL_PAYMENT,
  SET_EVENT_BY_ID,
  SET_USER_ORDER_STATUS,
  UPDATE_EVENT_STATUS,
} from './constants';

export const getEventById = (eventId, token) => ({
  type: GET_EVENT_BY_ID,
  eventId,
  token,
});

export const setEventById = (event, eventId) => ({
  type: SET_EVENT_BY_ID,
  event,
  eventId,
});

export const initialPayment = (data, eventId, token, cbSuccess) => ({
  type: INITIAL_PAYMENT,
  data,
  eventId,
  token,
  cbSuccess,
});

export const createOrder = (data, token, cbSuccess) => ({
  type: CREATE_ORDER_EVENT,
  data,
  token,
  cbSuccess,
});

export const actionUpdateEventStatus = (eventId, status, token) => ({
  type: UPDATE_EVENT_STATUS,
  eventId,
  status,
  token,
});

export const checkUserOrder = (eventId, token) => ({
  type: CHECK_USER_ORDER,
  eventId,
  token,
});

export const setUserOrderStatus = (hasOrdered) => ({
  type: SET_USER_ORDER_STATUS,
  hasOrdered,
});
