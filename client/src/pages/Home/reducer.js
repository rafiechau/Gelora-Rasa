import { produce } from 'immer';
import { SET_ALL_CATEGORIES, SET_ALL_EVENT, SET_ALL_LOCATION } from './constants';

export const initialState = {
  allEvent: [],
  allCategories: [],
  allLocation: [],
};

export const storedKey = [];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_EVENT:
        draft.allEvent = [...draft.allEvent, ...action.allEvent];
        break;
      case SET_ALL_CATEGORIES:
        draft.allCategories = action.allCategories;
        break;
      case SET_ALL_LOCATION:
        draft.allLocation = action.allLocation;
        break;
    }
  });

export default homeReducer;
