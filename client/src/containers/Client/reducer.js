import { produce } from 'immer';

import {
  IS_VERIFY,
  RESET_REGISTER_STEP,
  SET_EMAIL,
  SET_EXPIRE_TIME,
  SET_LOGIN,
  SET_STEP,
  SET_TOKEN,
  SET_TOKEN_VERIFY,
  SET_USER,
} from '@containers/Client/constants';

export const initialState = {
  login: false,
  user: null,
  token: null,
  step: 0,
  email: null,
  tokenVerify: null,
  expire: null,
  isVerify: false,
};

export const storedKey = ['login', 'user', 'token', 'step', 'email', 'tokenVerify', 'expire'];

const clientReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SET_LOGIN:
        draft.login = action.login;
        break;
      case SET_TOKEN:
        draft.token = action.token;
        break;
      case SET_USER:
        draft.user = action.user;
        break;
      case SET_STEP:
        draft.step = action.step;
        break;
      case SET_EMAIL:
        draft.email = action.email;
        break;
      case IS_VERIFY:
        draft.isVerify = action.isVerify;
        break;
      case SET_EXPIRE_TIME:
        draft.expire = action.expire;
        break;
      case SET_TOKEN_VERIFY:
        draft.tokenVerify = action.token;
        break;
      case RESET_REGISTER_STEP:
        return initialState;
    }
  });

export default clientReducer;
