import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import AuthenticationSaga from '@containers/Client/saga';
import homeSaga from '@pages/Home/saga';
import detailSaga from '@pages/DetailEvent/saga';
import forgotPasswordSaga from '@pages/ForgotPassword/saga';
import resetPasswordSaga from '@pages/ResetPassword/saga';
import createEventOrganizerSaga from '@pages/BecomeEventOrganizer/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    AuthenticationSaga(),
    homeSaga(),
    detailSaga(),
    forgotPasswordSaga(),
    resetPasswordSaga(),
    createEventOrganizerSaga(),
  ]);
}
