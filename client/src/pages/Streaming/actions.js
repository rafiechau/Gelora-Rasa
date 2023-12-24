import { CREATE_MEETING_ID, VERIFY_USER_FOR_MEETING } from './constants';

export const actionCreateMeeting = (data, token) => ({
  type: CREATE_MEETING_ID,
  payload: { data, token },
});

export const actionVerifyUserForMeeting = (eventId, token, callback) =>({
  type: VERIFY_USER_FOR_MEETING,
  payload: { eventId, token, callback },
});
