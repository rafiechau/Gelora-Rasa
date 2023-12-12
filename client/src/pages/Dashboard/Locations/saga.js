import { call, put, takeLatest } from 'redux-saga/effects';
import toast from 'react-hot-toast';
import { createLocationApi, deleteLocationByIdApi, getLocationApi, updateLocationByIdApi } from '@domain/api';
import { actionGetAllLocation } from '@pages/Home/actions';
import { setLoading } from '@containers/App/actions';
import { CREATE_LOCATION, DELETE_LOCATION, UPDATE_LOCATION_BY_ID } from './constants';
import { actionDeleteLocationSuccess } from './actions';

export function* doDeleteLocation(action) {
  try {
    const { locationId, token } = action.payload;
    const response = yield call(deleteLocationByIdApi, locationId, token);
    yield put(actionDeleteLocationSuccess(locationId));
    yield put(actionGetAllLocation(getLocationApi));
    toast.success(response.message);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }
}

function* doUpdateLocation(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(
      updateLocationByIdApi,
      action.payload.LocationId,
      action.payload.data,
      action.payload.token
    );
    yield put(actionGetAllLocation(getLocationApi));
    toast.success(response.message);
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

function* doCreateLocation(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(createLocationApi, action.payload.data, action.payload.token);
    yield put(actionGetAllLocation(getLocationApi));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

// bagusnya ganti sih nama saganya
export default function* dashboardLocationSaga() {
  yield takeLatest(DELETE_LOCATION, doDeleteLocation);
  yield takeLatest(UPDATE_LOCATION_BY_ID, doUpdateLocation);
  yield takeLatest(CREATE_LOCATION, doCreateLocation);
}
