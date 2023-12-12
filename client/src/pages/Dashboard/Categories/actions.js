import { CREATE_CATEGORIES, DELETE_CATEGORY, DELETE_CATEGORY_SUCCESS, RESET_DELETE_SUCCESS, UPDATE_CATEGORY_BY_ID } from './constants';

export const actionDeleteCategoryById = (categoryId, token) => ({
  type: DELETE_CATEGORY,
  payload: { categoryId, token },
});

export const actionDeleteCategorySuccess = (categoryId) => ({
  type: DELETE_CATEGORY_SUCCESS,
  payload: categoryId,
});

export const resetDeleteSuccess = () => ({
  type: RESET_DELETE_SUCCESS,
});

export const actionCreateCategories = (data, token) => ({
  type: CREATE_CATEGORIES,
  payload: { data, token },
});

export const actionUpdateCategoryById = (categoryId, data, token) => ({
  type: UPDATE_CATEGORY_BY_ID,
  payload: { categoryId, data, token },
});
