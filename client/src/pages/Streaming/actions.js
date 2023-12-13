import { CREATE_MEETING_ID } from './constants';

export const actionCreateMeeting = (data, token) => ({
  type: CREATE_MEETING_ID,
  payload: { data, token },
});
