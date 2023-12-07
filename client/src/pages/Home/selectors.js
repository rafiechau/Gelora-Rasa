import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHomeState = (state) => state.home || initialState;

export const selectAllEvent = createSelector(selectHomeState, (state) => state.allEvent);
