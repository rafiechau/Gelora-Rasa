export const authToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI5YzQ2NjllMy04Mzg3LTQwN2YtOGM2NC00YjcyMzIyZTZlMTMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwMzQxNTgyMCwiZXhwIjoxNzA2MDA3ODIwfQ.F32kDYYkT_GW3GEyMV-CR_XeLXd9f6My44bHhTF9vTI';

// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  // Destructuring the roomId from the response
  const { roomId } = await res.json();
  return roomId;
};
