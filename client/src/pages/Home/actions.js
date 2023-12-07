import { GET_ALL_EVENT, SET_ALL_EVENT } from './constants';

export const getAllEvent = (token, page) => ({
  type: GET_ALL_EVENT,
  payload: { token, page },
});

export const setAllEvent = (allEvent) => ({
  type: SET_ALL_EVENT,
  allEvent,
});
