import {
  CHECK_USER_ORDER,
  CREATE_ORDER_EVENT,
  GET_EVENT_BY_ID,
  INITIAL_PAYMENT,
  SET_EVENT_BY_ID,
  SET_USER_ORDER_STATUS,
  UPDATE_EVENT_STATUS,
} from './constants';

export const getEventById = (eventId) => ({
  type: GET_EVENT_BY_ID,
  eventId,
});

export const setEventById = (event, eventId) => ({
  type: SET_EVENT_BY_ID,
  event,
  eventId,
});

export const initialPayment = (data, eventId, cbSuccess) => ({
  type: INITIAL_PAYMENT,
  data,
  eventId,
  cbSuccess,
});

export const createOrder = (data, cbSuccess) => ({
  type: CREATE_ORDER_EVENT,
  data,
  cbSuccess,
});

export const actionUpdateEventStatus = (eventId, status) => ({
  type: UPDATE_EVENT_STATUS,
  eventId,
  status,
});

export const checkUserOrder = (eventId) => ({
  type: CHECK_USER_ORDER,
  eventId,
});

export const setUserOrderStatus = (hasOrdered) => ({
  type: SET_USER_ORDER_STATUS,
  hasOrdered,
});
