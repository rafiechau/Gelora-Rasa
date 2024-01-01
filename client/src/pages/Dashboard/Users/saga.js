import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoading, showPopup } from '@containers/App/actions';
import { deleteUserByAdminApi, getAllUsersApi } from '@domain/api';
import { DELETE_USER_BY_ADMIN, GET_ALL_USERS } from './constants';
import { actionDeleteUserSuccess, actionGetAllUsers, actionSetAllUsers } from './actions';

export function* doGetUsers(action) {
  yield put(setLoading(true));
  try {
    const { page, pageSize } = action.payload;
    const response = yield call(getAllUsersApi, page, pageSize);
    yield put(
      actionSetAllUsers({
        users: response.data,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
      })
    );
  } catch (error) {
    if (error?.response?.status === 400 || error?.response?.status === 404 || error?.response?.status === 403) {
      toast.error(error.response.data.message);
    } else if (error?.response?.status === 401) {
      toast.error('logout');
    } else {
      yield put(showPopup());
    }
  } finally {
    yield put(setLoading(false));
  }
}

export function* doDeleteUserByAdmin(action) {
  yield put(setLoading(true));
  try {
    const { userId } = action.payload;
    const response = yield call(deleteUserByAdminApi, userId);
    yield put(actionDeleteUserSuccess(userId));
    yield put(actionGetAllUsers(getAllUsersApi));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export function* dashboardUsersSaga() {
  yield takeLatest(GET_ALL_USERS, doGetUsers);
  yield takeLatest(DELETE_USER_BY_ADMIN, doDeleteUserByAdmin);
}
