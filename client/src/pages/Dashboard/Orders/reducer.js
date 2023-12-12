import { produce } from 'immer';
import { DELETE_ORDER_SUCCESS, RESET_DELETE_SUCCESS, SET_ALL_MY_ORDER } from './constants';

export const initialState = {
  allMyOrders: [],
  deleteSuccess: false,
};

export const storedKey = [];

const dashboardMyOrdersReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_MY_ORDER:
        draft.allMyOrders = action.allMyOrders;
        break;
      case DELETE_ORDER_SUCCESS:
        draft.deleteSuccess = true;
        break;
      case RESET_DELETE_SUCCESS:
        draft.deleteSuccess = false;
        break;
    }
  });

export default dashboardMyOrdersReducer;
