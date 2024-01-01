import {
  CREATE_LOCATION,
  DELETE_LOCATION,
  DELETE_LOCATION_SUCCESS,
  RESET_DELETE_SUCCESS,
  UPDATE_LOCATION_BY_ID,
} from './constants';

export const actionDeleteLocationById = (locationId) => ({
  type: DELETE_LOCATION,
  payload: { locationId },
});

export const actionDeleteLocationSuccess = (locationId) => ({
  type: DELETE_LOCATION_SUCCESS,
  payload: locationId,
});

export const resetDeleteSuccess = () => ({
  type: RESET_DELETE_SUCCESS,
});

export const actionUpdateLocationById = (LocationId, data) => ({
  type: UPDATE_LOCATION_BY_ID,
  payload: { LocationId, data },
});

export const actionCreateLocation = (data) => ({
  type: CREATE_LOCATION,
  payload: { data },
});
