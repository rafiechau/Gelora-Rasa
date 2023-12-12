import { CREATE_EVENT } from './constants';

export const actionCreateEvent = (data, token) => ({
  type: CREATE_EVENT,
  payload: { data, token },
});
