import {
  GET_ALL_CATEGORIES,
  GET_ALL_EVENT,
  GET_ALL_LOCATION,
  GET_PAGINATED_EVENT,
  SET_ALL_CATEGORIES,
  SET_ALL_EVENT,
  SET_ALL_LOCATION,
  SET_PAGINATED_EVENT,
} from './constants';

export const getAllEvent = (page = 1, pageSize = 10) => ({
  type: GET_ALL_EVENT,
  payload: { page, pageSize },
});

export const setAllEvent = (data) => ({
  type: SET_ALL_EVENT,
  payload: data,
});

export const getPaginatedPosts = (page, pageSize) => ({
  type: GET_PAGINATED_EVENT,
  payload: { page, pageSize },
});

export const setPaginatedPosts = (data) => ({
  type: SET_PAGINATED_EVENT,
  payload: data,
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
