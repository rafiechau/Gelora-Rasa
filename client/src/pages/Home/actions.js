import {
  GET_ALL_CATEGORIES,
  GET_ALL_EVENT,
  GET_ALL_LOCATION,
  SET_ALL_CATEGORIES,
  SET_ALL_EVENT,
  SET_ALL_LOCATION,
} from './constants';

export const getAllEvent = (token, page) => ({
  type: GET_ALL_EVENT,
  payload: { token, page },
});

export const setAllEvent = (allEvent) => ({
  type: SET_ALL_EVENT,
  allEvent,
});

export const actionGetAllLocation = (token) => ({
  type: GET_ALL_LOCATION,
  payload: { token },
});

export const actionSetAllLocation = (allLocation) => ({
  type: SET_ALL_LOCATION,
  allLocation,
});

export const actionGetAllCategories = (token) => ({
  type: GET_ALL_CATEGORIES,
  payload: { token },
});

export const actionSetAllCategories = (allCategories) => ({
  type: SET_ALL_CATEGORIES,
  allCategories,
});
