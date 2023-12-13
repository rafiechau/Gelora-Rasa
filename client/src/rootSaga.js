import { all } from 'redux-saga/effects';

import appSaga from '@containers/App/saga';
import AuthenticationSaga from '@containers/Client/saga';
import homeSaga from '@pages/Home/saga';
import detailSaga from '@pages/DetailEvent/saga';
import forgotPasswordSaga from '@pages/ForgotPassword/saga';
import resetPasswordSaga from '@pages/ResetPassword/saga';
import createEventOrganizerSaga from '@pages/BecomeEventOrganizer/saga';
import { myEventSaga } from '@pages/Dashboard/MyEvents/saga';
import { dashboardOrdersSaga } from '@pages/Dashboard/Orders/saga';
import dashboardLocationSaga from '@pages/Dashboard/Locations/saga';
import dashboardCategorySaga from '@pages/Dashboard/Categories/saga';
import { streamingSaga } from '@pages/Streaming/saga';

export default function* rootSaga() {
  yield all([
    appSaga(),
    AuthenticationSaga(),
    homeSaga(),
    detailSaga(),
    forgotPasswordSaga(),
    resetPasswordSaga(),
    createEventOrganizerSaga(),
    myEventSaga(),
    dashboardOrdersSaga(),
    dashboardLocationSaga(),
    dashboardCategorySaga(),
    streamingSaga(),
  ]);
}
