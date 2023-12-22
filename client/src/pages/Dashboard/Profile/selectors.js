import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserState = (state) => state.dashboardProfile || initialState;

export const selectProfile = createSelector(selectUserState, (state) => state.profile);
