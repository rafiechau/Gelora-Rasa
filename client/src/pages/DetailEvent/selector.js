import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDetailEventState = (state) => state.detailEvent || initialState;

export const selectEvent = createSelector(selectDetailEventState, (state) => state.event);
