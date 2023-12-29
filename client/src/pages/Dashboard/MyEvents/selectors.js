import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMyEventsState = (state) => state.myEvents || initialState;

export const selectAllMyEvents = createSelector(selectMyEventsState, (state) => state.allMyEvent);

export const selectAllMyOrderEvents = createSelector(selectMyEventsState, (state) => state.allMyEventOrderUser);
