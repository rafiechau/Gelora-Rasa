import { produce } from 'immer';
import { SET_ALL_EVENT } from './constants';

export const initialState = {
  allEvent: [],
};

export const storedKey = [];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_EVENT:
        draft.allEvent = [...draft.allEvent, ...action.allEvent];
        break;
    }
  });

export default homeReducer;
