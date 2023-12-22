import { produce } from 'immer';
import { DELETE_USER_BY_ADMIN_SUCCESS, RESET_DELETE_USER_BY_ADMIN_SUCCESS, SET_ALL_USERS } from './constants';

export const initialState = {
  allUsers: [],
  deleteSuccess: false,
  totalPages: 0,
  currentPage: 1,
};

export const storedKey = [];

const dashboardUsersReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_USERS:
        draft.allUsers = action.payload.users;
        draft.totalPages = action.payload.totalPages;
        draft.currentPage = action.payload.currentPage;
        break;
      case DELETE_USER_BY_ADMIN_SUCCESS:
        draft.deleteSuccess = true;
        break;
      case RESET_DELETE_USER_BY_ADMIN_SUCCESS:
        draft.deleteSuccess = false;
        break;
    }
  });

export default dashboardUsersReducer;
