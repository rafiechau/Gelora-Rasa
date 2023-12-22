import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUsersState = (state) => state.dashboardUser || initialState;

export const selectAllUsers = createSelector(selectUsersState, (state) => state.allUsers);
