export const authToken = 'isi sendiri di library vidio sdk';

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
