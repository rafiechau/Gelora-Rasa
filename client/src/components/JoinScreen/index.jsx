// JoinScreen.jsx
import PropTypes from 'prop-types';
import { useState } from 'react';
import classes from './style.module.scss';

const JoinScreen = ({ getMeetingAndToken, setMode, user }) => {
  const [meetingId, setMeetingId] = useState(null);
  const isHost = user?.role === 2;

  const onClick = async (mode) => {
    setMode(mode);
    await getMeetingAndToken(meetingId);
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
        <button type="button" className={classes.buttonJoinStreaming} onClick={() => onClick('VIEWER')}>
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
};

export default JoinScreen;
