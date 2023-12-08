import { GET_EVENT_BY_ID, SET_EVENT_BY_ID } from './constants';

export const getEventById = (eventId) => ({
  type: GET_EVENT_BY_ID,
  eventId,
});

export const setEventById = (event, eventId) => ({
  type: SET_EVENT_BY_ID,
  event,
  eventId,
});
