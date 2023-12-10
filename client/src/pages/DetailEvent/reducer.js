import { produce } from 'immer';
import { SET_EVENT_BY_ID } from './constants';

export const initialState = {
  event: {},
};

export const storedKey = [];

const detailEventReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_EVENT_BY_ID:
        draft.event = action.event;
        break;
    }
  });

export default detailEventReducer;
