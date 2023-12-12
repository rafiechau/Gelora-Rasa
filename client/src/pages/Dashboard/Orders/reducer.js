import { produce } from 'immer';
import { SET_ALL_MY_ORDER } from './constants';

export const initialState = {
  allMyOrders: [],
};

export const storedKey = [];

const myOrdersReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_ALL_MY_ORDER:
        draft.allMyOrders = action.allMyOrders;
        break;
    }
  });

// ini mungkin bakal diganti jadi yang lain atau dipindahin
export default myOrdersReducer;
