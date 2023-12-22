import { produce } from 'immer';
import { SET_ALL_CATEGORIES, SET_ALL_EVENT, SET_ALL_LOCATION, SET_PAGINATED_EVENT } from './constants';

export const initialState = {
  allEvent: [],
  allCategories: [],
  allLocation: [],
  totalPages: 0,
  currentPage: 1,
};

export const storedKey = [];

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_EVENT:
        draft.allEvent = action.payload.events;
        draft.count = action.payload.count;
        draft.totalPages = action.payload.totalPages;
        draft.currentPage = action.payload.currentPage;
        break;
      case SET_PAGINATED_EVENT:
        draft.allEvent = action.payload.events;
        draft.totalPages = action.payload.totalPages;
        draft.currentPage = action.payload.currentPage;
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
