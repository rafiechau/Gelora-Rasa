import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectMyOrderState = (state) => state.dashboardOrder || initialState;

export const selectAllMyOrders = createSelector(selectMyOrderState, (state) => state.allMyOrders);
