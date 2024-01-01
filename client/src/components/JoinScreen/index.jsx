// JoinScreen.jsx
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionVerifyUserForMeeting } from '@pages/Streaming/actions';
import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';

const JoinScreen = ({ getMeetingAndToken, setMode, user, allMyOrders }) => {
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
      actionVerifyUserForMeeting(selectedEventId, () => {
        setMode('VIEWER');
        getMeetingAndToken(meetingId);
      })
    );
  };

  return (
    <div className={classes.containerJoinStreaming}>
      <img src="assets/images/streaming.jpg" alt="live streaming" className={classes.imageLiveStreaming} />
      <div className={classes.message}>
        <FormattedMessage id="app_desc_streaming" />
      </div>
      {isHost && (
        <>
          <button type="button" className={classes.buttonCreateMeeting} onClick={() => onClick('CONFERENCE')}>
            <FormattedMessage id="app_btn_create_meeting" />
          </button>
          {' or '}
        </>
      )}
      {!isHost && allMyOrders.length === 0 && (
        <p>
          <FormattedMessage id="app_text_havent_purchased" />
        </p>
      )}
      {!isHost && allMyOrders.length > 0 && (
        <label htmlFor="eventSelect">
          <FormattedMessage id="app_select_event" />:
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
          <FormattedMessage id="app_btn_join_as_host" />
        </button>
      ) : (
        <button type="button" className={classes.buttonJoinStreaming} onClick={verifyAndJoinAsViewer}>
          <FormattedMessage id="app_btn_join_as_viewer" />
        </button>
      )}
    </div>
  );
};

JoinScreen.propTypes = {
  getMeetingAndToken: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  allMyOrders: PropTypes.array,
};

export default JoinScreen;
