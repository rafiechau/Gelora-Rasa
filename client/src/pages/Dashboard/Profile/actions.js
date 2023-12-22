import {
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_SUCCESS,
  EDIT_PHOTO_PROFILE,
  EDIT_PROFILE,
  GET_PROFILE,
  RESET_DELETE_ACCOUNT_SUCCESS,
  RESET_PROFILE,
  SET_PROFILE,
} from './constants';

export const actionGetProfile = () => ({
  type: GET_PROFILE,
});

export const actionSetProfile = (profile) => ({
  type: SET_PROFILE,
  profile,
});
export const actionResetProfile = () => ({
  type: RESET_PROFILE,
});
export const actionEditPhotoProfile = (data) => ({
  type: EDIT_PHOTO_PROFILE,
  data,
});

export const actionEditProfile = (data, callback) => ({
  type: EDIT_PROFILE,
  data,
  callback,
});

export default (token) => ({
  type: DELETE_ACCOUNT,
  payload: { token },
});

export const actionDeleteAccountsSuccess = () => ({
  type: DELETE_ACCOUNT_SUCCESS,
});

export const resetDeleteAccountSuccess = () => ({
  type: RESET_DELETE_ACCOUNT_SUCCESS,
});
