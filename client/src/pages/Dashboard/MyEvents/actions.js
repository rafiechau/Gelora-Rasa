import {
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  GET_ALL_MY_EVENT,
  RESET_DELETE_SUCCESS,
  SET_ALL_MY_EVENT,
  UPDATE_EVENT_BY_ID,
} from './constants';

export const actionGetAllMyEvent = (token) => ({
  type: GET_ALL_MY_EVENT,
  payload: { token },
});

export const actionSetAllMyEvent = (allMyEvent) => ({
  type: SET_ALL_MY_EVENT,
  allMyEvent,
});

export const updateEventById = (eventId, data, token) => ({
  type: UPDATE_EVENT_BY_ID,
  payload: { eventId, data, token },
});

export const deleteEventById = (eventId, token) => ({
  type: DELETE_EVENT,
  payload: { eventId, token },
});

export const deleteEventSuccess = (eventId) => ({
  type: DELETE_EVENT_SUCCESS,
  payload: eventId,
});

export const resetDeleteSuccess = () => ({
  type: RESET_DELETE_SUCCESS,
});
