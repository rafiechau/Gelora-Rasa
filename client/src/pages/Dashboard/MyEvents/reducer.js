import { produce } from 'immer';
import { DELETE_EVENT_SUCCESS, RESET_DELETE_SUCCESS, SET_ALL_MY_EVENT } from './constants';

export const initialState = {
  allMyEvent: [],
  deleteSuccess: false,
};

export const storedKey = [];

const myEventReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_MY_EVENT:
        draft.allMyEvent = action.allMyEvent;
        break;
      case DELETE_EVENT_SUCCESS:
        draft.deleteSuccess = true;
        break;
      case RESET_DELETE_SUCCESS:
        draft.deleteSuccess = false;
        break;
    }
  });

// ini mungkin bakal diganti jadi yang lain atau dipindahin
export default myEventReducer;
