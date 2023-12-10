import { CREATE_ORDER, GET_EVENT_BY_ID, SET_EVENT_BY_ID, UPDATE_ORDER_STATUS } from './constants';

export const getEventById = (eventId) => ({
  type: GET_EVENT_BY_ID,
  eventId,
});

export const setEventById = (event, eventId) => ({
  type: SET_EVENT_BY_ID,
  event,
  eventId,
});

export const createOrder = (data, token, callback) => ({
  type: CREATE_ORDER,
  payload: {
    data: { eventId: data.eventId, totalTickets: data.totalTickets, ticketsTypes: data.ticketTypes },
    token,
    callback,
  },
});

export const updateOrderStatus = (orderId, status, token) => ({
  type: UPDATE_ORDER_STATUS,
  orderId,
  status,
  token,
});
