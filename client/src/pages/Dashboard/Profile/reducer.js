import { produce } from 'immer';
import { RESET_PROFILE, SET_PROFILE } from './constants';

export const initialState = {
  profile: null,
  deleteSuccess: false,
};

const dashboardProfileReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_PROFILE:
        draft.profile = action.profile;
        break;
      // case DELETE_ACCOUNT_SUCCESS:
      //   draft.deleteSuccess = true;
      //   break;
      // case RESET_DELETE_ACCOUNT_SUCCESS:
      //   draft.deleteSuccess = false;
      //   break;
      case RESET_PROFILE:
        return initialState;
    }
  });

export default dashboardProfileReducer;
