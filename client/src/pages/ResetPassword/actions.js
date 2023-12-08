import { SEND_RESET_PASSWORD } from './constants';

export const actionResetPassword = (data, callback) => ({
  type: SEND_RESET_PASSWORD,
  data,
  callback,
});
