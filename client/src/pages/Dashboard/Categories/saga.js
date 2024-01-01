import { createCategoryApi, deleteCategoryByIdApi, getCategoriesApi, updateCategoryByIdApi } from '@domain/api';
import toast from 'react-hot-toast';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setLoading } from '@containers/App/actions';
import { actionGetAllCategories } from '@pages/Home/actions';
import { CREATE_CATEGORIES, DELETE_CATEGORY, UPDATE_CATEGORY_BY_ID } from './constants';
import { actionDeleteCategorySuccess } from './actions';

export function* doDeleteCategory(action) {
  yield put(setLoading(true));
  try {
    const { categoryId } = action.payload;
    const response = yield call(deleteCategoryByIdApi, categoryId);
    yield put(actionDeleteCategorySuccess(categoryId));
    yield put(actionGetAllCategories(getCategoriesApi));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

function* doCreateCategory(action) {
  yield put(setLoading(true));
  try {
    const response = yield call(createCategoryApi, action.payload.data);
    yield put(actionGetAllCategories(getCategoriesApi));
    toast.success(response.message);
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

function* doUpdateCategory(action) {
  yield put(setLoading(true));
  try {
    const { categoryId, data } = action.payload;
    const response = yield call(updateCategoryByIdApi, categoryId, data);
    yield put(actionGetAllCategories(getCategoriesApi));
    toast.success(response.message);
  } catch (error) {
    toast.error(error.response.data.message);
  } finally {
    yield put(setLoading(false));
  }
}

export default function* dashboardCategorySaga() {
  yield takeLatest(DELETE_CATEGORY, doDeleteCategory);
  yield takeLatest(CREATE_CATEGORIES, doCreateCategory);
  yield takeLatest(UPDATE_CATEGORY_BY_ID, doUpdateCategory);
}
