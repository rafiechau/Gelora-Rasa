import {
  CREATE_LOCATION,
  DELETE_LOCATION,
  DELETE_LOCATION_SUCCESS,
  RESET_DELETE_SUCCESS,
  UPDATE_LOCATION_BY_ID,
} from './constants';

export const actionDeleteLocationById = (locationId, token) => ({
  type: DELETE_LOCATION,
  payload: { locationId, token },
});

export const actionDeleteLocationSuccess = (locationId) => ({
  type: DELETE_LOCATION_SUCCESS,
  payload: locationId,
});

export const resetDeleteSuccess = () => ({
  type: RESET_DELETE_SUCCESS,
});

export const actionUpdateLocationById = (LocationId, data, token) => ({
  type: UPDATE_LOCATION_BY_ID,
  payload: { LocationId, data, token },
});

export const actionCreateLocation = (data, token) => ({
  type: CREATE_LOCATION,
  payload: { data, token },
});
