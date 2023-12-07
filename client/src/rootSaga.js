import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import AuthenticationSaga from '@containers/Client/saga';
import homeSaga from '@pages/Home/saga';

export default function* rootSaga() {
  yield all([appSaga(), AuthenticationSaga(), homeSaga()]);
}
