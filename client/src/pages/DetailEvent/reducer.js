import { produce } from 'immer';
import { SET_EVENT_BY_ID, SET_USER_ORDER_STATUS } from './constants';

export const initialState = {
  event: {},
  hasOrdered: false,
};

export const storedKey = [];

const detailEventReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_EVENT_BY_ID:
        draft.event = action.event;
        break;
      case SET_USER_ORDER_STATUS:
        draft.hasOrdered = action.hasOrdered;
        break;
    }
  });

export default detailEventReducer;
