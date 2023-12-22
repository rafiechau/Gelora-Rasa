import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { deleteUserByAdminApi, getAllUsersApi } from '@domain/api';
import { DELETE_USER_BY_ADMIN, GET_ALL_USERS } from './constants';
import { actionDeleteUserSuccess, actionGetAllUsers, actionSetAllUsers } from './actions';

export function* doGetUsers(action) {
  yield put(setLoading(true));
  try {
    const { token, page, pageSize } = action.payload;
    const response = yield call(getAllUsersApi, token, page, pageSize);
    console.log(response);
    yield put(
      actionSetAllUsers({
        users: response.data,
        totalPages: response.totalPages,
        currentPage: response.currentPage,
      })
    );
  } catch (error) {
    console.log(error);
    toast.error('Error fetching users');
  } finally {
    yield put(setLoading(false));
  }
}

export function* doDeleteUserByAdmin(action) {
  yield put(setLoading(true));
  try {
    const { userId, token } = action.payload;
    const response = yield call(deleteUserByAdminApi, userId, token);
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
