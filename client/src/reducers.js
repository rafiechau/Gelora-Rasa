import { combineReducers } from 'redux';

import appReducer, { storedKey as storedAppState } from '@containers/App/reducer';
import clientReducer, { storedKey as storedClientState } from '@containers/Client/reducer';
import languageReducer from '@containers/Language/reducer';

import homeReducer from '@pages/Home/reducer';
import detailEventReducer from '@pages/DetailEvent/reducer';
import myEventReducer from '@pages/Dashboard/MyEvents/reducer';
import myOrdersReducer from '@pages/Dashboard/Orders/reducer';
import dashboardLocationReducer from '@pages/Dashboard/Locations/reducer';
import dashboardCategoryReducer from '@pages/Dashboard/Categories/reducer';
import { mapWithPersistor } from './persistence';

const storedReducers = {
  app: { reducer: appReducer, whitelist: storedAppState },
  client: { reducer: clientReducer, whitelist: storedClientState },
};

const temporaryReducers = {
  language: languageReducer,
  home: homeReducer,
  detailEvent: detailEventReducer,
  myEvents: myEventReducer,
  myOrders: myOrdersReducer,
  dashboardLocation: dashboardLocationReducer,
  dashboardCategory: dashboardCategoryReducer,
};

const createReducer = () => {
  const coreReducer = combineReducers({
    ...mapWithPersistor(storedReducers),
    ...temporaryReducers,
  });
  const rootReducer = (state, action) => coreReducer(state, action);
  return rootReducer;
};

export default createReducer;
