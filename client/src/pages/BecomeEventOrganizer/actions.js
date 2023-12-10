import { CREATE_EVENT_ORGANIZER } from './constants';

export const createEventOrganizer = (data, token) => ({
  type: CREATE_EVENT_ORGANIZER,
  payload: { data, token },
});
