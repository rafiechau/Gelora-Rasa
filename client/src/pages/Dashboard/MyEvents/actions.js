import {
  CREATE_EVENT,
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  GET_ALL_MY_EVENT,
  RESET_DELETE_SUCCESS,
  SET_ALL_MY_EVENT,
  UPDATE_EVENT_BY_ID,
  UPDATE_EVENT_EVENT_ORGANIZER,
} from './constants';

export const actionGetAllMyEvent = (token) => ({
  type: GET_ALL_MY_EVENT,
  payload: { token },
});

export const actionSetAllMyEvent = (allMyEvent) => ({
  type: SET_ALL_MY_EVENT,
  allMyEvent,
});

export const actionCreateEvent = (data, token) => ({
  type: CREATE_EVENT,
  payload: { data, token },
});

export const actionUpdateEventById = (eventId, data, token) => ({
  type: UPDATE_EVENT_BY_ID,
  payload: { eventId, data, token },
});

export const actionUpdateEventEventOrganizer = (eventId, data, token) => ({
  type: UPDATE_EVENT_EVENT_ORGANIZER,
  payload: { eventId, data, token },
});

export const actionDeleteMyEventById = (eventId, token) => ({
  type: DELETE_EVENT,
  payload: { eventId, token },
});

export const actionDeleteMyEventSuccess = (eventId) => ({
  type: DELETE_EVENT_SUCCESS,
  payload: eventId,
});

export const actionResetDeleteSuccess = () => ({
  type: RESET_DELETE_SUCCESS,
});
