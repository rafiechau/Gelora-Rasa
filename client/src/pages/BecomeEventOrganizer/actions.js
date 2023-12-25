import { CREATE_EVENT_ORGANIZER } from './constants';

export const createEventOrganizer = (data, token, callback) => ({
  type: CREATE_EVENT_ORGANIZER,
  payload: { data, token, callback },
});
