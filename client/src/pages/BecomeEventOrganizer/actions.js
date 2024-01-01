import { CREATE_EVENT_ORGANIZER } from './constants';

export const createEventOrganizer = (data, callback) => ({
  type: CREATE_EVENT_ORGANIZER,
  payload: { data, callback },
});
