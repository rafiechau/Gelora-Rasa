import { createSelector } from 'reselect';
import { initialState } from '@containers/Client/reducer';

const selectClientState = (state) => state.client || initialState;

export const selectLogin = createSelector(selectClientState, (state) => state.login);
export const selectToken = createSelector(selectClientState, (state) => state.token);
export const selectUser = createSelector(selectClientState, (state) => state.user);

export const selectStep = createSelector(selectClientState, (state) => state.step);
export const selectEmail = createSelector(selectClientState, (state) => state.email);
export const selectTokenEmail = createSelector(selectClientState, (state) => state.tokenVerify);
export const selectIsVerify = createSelector(selectClientState, (state) => state.isVerify);
export const selectExpire = createSelector(selectClientState, (state) => state.expire);
