import {
  CREATE_CATEGORIES,
  DELETE_CATEGORY,
  DELETE_CATEGORY_SUCCESS,
  RESET_DELETE_SUCCESS,
  UPDATE_CATEGORY_BY_ID,
} from './constants';

export const actionDeleteCategoryById = (categoryId) => ({
  type: DELETE_CATEGORY,
  payload: { categoryId },
});

export const actionDeleteCategorySuccess = (categoryId) => ({
  type: DELETE_CATEGORY_SUCCESS,
  payload: categoryId,
});

export const resetDeleteSuccess = () => ({
  type: RESET_DELETE_SUCCESS,
});

export const actionCreateCategories = (data) => ({
  type: CREATE_CATEGORIES,
  payload: { data },
});

export const actionUpdateCategoryById = (categoryId, data) => ({
  type: UPDATE_CATEGORY_BY_ID,
  payload: { categoryId, data },
});
