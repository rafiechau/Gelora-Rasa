import { produce } from 'immer';
import { DELETE_EVENT_SUCCESS, RESET_DELETE_SUCCESS, SET_ALL_MY_EVENT, SET_ALL_MY_ORDER_USER } from './constants';

export const initialState = {
  allMyEvent: [],
  allMyEventOrderUser: [],
  deleteSuccess: false,
};

export const storedKey = [];

const myEventReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_MY_EVENT:
        draft.allMyEvent = action.allMyEvent;
        break;
      case SET_ALL_MY_ORDER_USER:
        draft.allMyEventOrderUser = action.allMyEventOrderUser;
        break;
      case DELETE_EVENT_SUCCESS:
        draft.deleteSuccess = true;
        break;
      case RESET_DELETE_SUCCESS:
        draft.deleteSuccess = false;
        break;
    }
  });

export default myEventReducer;
