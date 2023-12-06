import { FORGOT_PASSWORD } from './constants';

export const actionSendForgotPassword = (data, callback) => ({
  type: FORGOT_PASSWORD,
  data,
  callback,
});
