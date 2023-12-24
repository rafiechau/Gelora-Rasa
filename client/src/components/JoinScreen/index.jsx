// JoinScreen.jsx
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionVerifyUserForMeeting } from '@pages/Streaming/actions';
import classes from './style.module.scss';

const JoinScreen = ({ getMeetingAndToken, setMode, user, token, allMyOrders }) => {
  const dispatch = useDispatch();
  const [meetingId, setMeetingId] = useState(null);
  const isHost = user?.role === 2;
  const [selectedEventId, setSelectedEventId] = useState('');

  const onClick = async (mode) => {
    setMode(mode);
    await getMeetingAndToken(meetingId);
  };

  const verifyAndJoinAsViewer = async () => {
    if (!meetingId) {
      alert('Please enter a valid meeting ID.');
      return;
    }

    dispatch(
      actionVerifyUserForMeeting(selectedEventId, token, () => {
        setMode('VIEWER');
        getMeetingAndToken(meetingId);
      })
    );
  };

  return (
    <div className={classes.containerJoinStreaming}>
      <img src="assets/images/streaming.jpg" alt="live streaming" className={classes.imageLiveStreaming} />
      <div className={classes.message}>Enjoy Yourself and don&apos;t recorder it. we watch you</div>
      {isHost && (
        <>
          <button type="button" className={classes.buttonCreateMeeting} onClick={() => onClick('CONFERENCE')}>
            Create Meeting
          </button>
          {' or '}
        </>
      )}
      {!isHost && allMyOrders.length === 0 && <p>You haven't purchased any event tickets yet.</p>}
      {!isHost && allMyOrders.length > 0 && (
        <label htmlFor="eventSelect">
          Select Event:
          <select id="eventSelect" value={selectedEventId} onChange={(e) => setSelectedEventId(e.target.value)}>
            <option value="">Select an Event</option>
            {allMyOrders.map((order) => (
              <option key={order.event.id} value={order.event.id}>
                {order.event.eventName}
              </option>
            ))}
          </select>
        </label>
      )}

      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      {isHost ? (
        <button type="button" className={classes.buttonJoinStreaming} onClick={() => onClick('CONFERENCE')}>
          Join as Host
        </button>
      ) : (
        <button type="button" className={classes.buttonJoinStreaming} onClick={verifyAndJoinAsViewer}>
          Join as Viewer
        </button>
      )}
    </div>
  );
};

JoinScreen.propTypes = {
  getMeetingAndToken: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  allMyOrders: PropTypes.array,
};

export default JoinScreen;
