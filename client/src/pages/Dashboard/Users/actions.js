import {
  DELETE_USER_BY_ADMIN,
  DELETE_USER_BY_ADMIN_SUCCESS,
  GET_ALL_USERS,
  RESET_DELETE_USER_BY_ADMIN_SUCCESS,
  SET_ALL_USERS,
} from './constants';

export const actionGetAllUsers = (page = 1, pageSize = 10) => ({
  type: GET_ALL_USERS,
  payload: { page, pageSize },
});

export const actionSetAllUsers = (data) => ({
  type: SET_ALL_USERS,
  payload: data,
});

export const actionDeleteUserById = (userId) => ({
  type: DELETE_USER_BY_ADMIN,
  payload: { userId },
});

export const actionDeleteUserSuccess = (userId) => ({
  type: DELETE_USER_BY_ADMIN_SUCCESS,
  payload: userId,
});

export const resetDeleteUserSuccess = () => ({
  type: RESET_DELETE_USER_BY_ADMIN_SUCCESS,
});
