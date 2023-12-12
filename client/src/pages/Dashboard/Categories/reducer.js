import { produce } from 'immer';
import { DELETE_CATEGORY_SUCCESS, RESET_DELETE_SUCCESS } from './constants';

export const initialState = {
  deleteSuccess: false,
};

export const storedKey = [];

// nama reducer bagusnya diganti ya
const dashboardCategoryReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case DELETE_CATEGORY_SUCCESS:
        draft.deleteSuccess = true;
        break;
      case RESET_DELETE_SUCCESS:
        draft.deleteSuccess = false;
        break;
    }
  });

export default dashboardCategoryReducer;
