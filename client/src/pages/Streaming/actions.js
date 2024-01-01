import { CREATE_MEETING_ID, VERIFY_USER_FOR_MEETING } from './constants';

export const actionCreateMeeting = (data) => ({
  type: CREATE_MEETING_ID,
  payload: { data },
});

export const actionVerifyUserForMeeting = (eventId, callback) => ({
  type: VERIFY_USER_FOR_MEETING,
  payload: { eventId, callback },
});
