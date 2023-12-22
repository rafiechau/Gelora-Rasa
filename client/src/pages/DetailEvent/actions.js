import {
  CREATE_ORDER_EVENT,
  GET_EVENT_BY_ID,
  INITIAL_PAYMENT,
  SET_EVENT_BY_ID,
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

export const createOrder = (data, token) => ({
  type: CREATE_ORDER_EVENT,
  data,
  token,
});

// export const createOrder = (data, token, callback) => ({
//   type: CREATE_ORDER,
//   payload: {
//     data: { eventId: data.eventId, totalTickets: data.totalTickets, ticketsTypes: data.ticketTypes },
//     token,
//     callback,
//   },
// });

// export const updateOrderStatus = (orderId, status, token) => ({
//   type: UPDATE_ORDER_STATUS,
//   orderId,
//   status,
//   token,
// });

export const actionUpdateEventStatus = (eventId, status, token) => ({
  type: UPDATE_EVENT_STATUS,
  eventId,
  status,
  token,
});
