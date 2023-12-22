import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useMeeting, Constants, usePubSub } from '@videosdk.live/react-sdk';
import { useDispatch } from 'react-redux';
import EventSelectionForm from '@components/EventSelectionForm';
import SpeakerView from '@components/SpeakerView';
import ViewerView from '@components/ViewerView';
import { actionCreateMeeting } from '@pages/Streaming/actions';
import classes from './style.module.scss';

const Container = ({ meetingId, onMeetingLeave, user, allMyEvents, token }) => {
  const dispatch = useDispatch();
  const [selectedEventId, setSelectedEventId] = useState('');
  const [inputMeetingId, setInputMeetingId] = useState('');
  const [joined, setJoined] = useState(null);
  const [joinLivestreamRequest, setJoinLivestreamRequest] = useState();
  const { join, localParticipant, changeMode } = useMeeting();

  const handleEventChange = (event) => {
    setSelectedEventId(event.target.value);
  };

  // Fungsi untuk menangani perubahan input Meeting ID
  const handleMeetingIdChange = (event) => {
    setInputMeetingId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(actionCreateMeeting({ eventId: selectedEventId, meetingId: inputMeetingId }, token));
  };

  const mMeeting = useMeeting({
    onMeetingJoined: () => {
      if (mMeetingRef.current.localParticipant.mode == 'CONFERENCE') {
        mMeetingRef.current.localParticipant.pin();
      }
      setJoined('JOINED');
    },
    onMeetingLeft: () => {
      onMeetingLeave();
    },
    onParticipantModeChanged: (data) => {
      const { localParticipant } = mMeetingRef.current;
      if (data.participantId == localParticipant.id) {
        if (data.mode == Constants.modes.CONFERENCE) {
          localParticipant.pin();
        } else {
          localParticipant.unpin();
        }
      }
    },
    onError: (error) => {
      alert(error.message);
    },
    onHlsStateChanged: (data) => {
      console.log('HLS State Changed', data);
    },
  });
  const joinMeeting = () => {
    setJoined('JOINING');
    join();
  };

  const mMeetingRef = useRef(mMeeting);
  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  return (
    <div className={classes.containerMeetingId}>
      <div className={classes.containerMeetingId}>
        {/* <FlyingEmojisOverlay /> */}
        {user?.role !== 1 && <h3 className={classes.meetingId}>Meeting Id: {meetingId}</h3>}
        {user?.role !== 1 && !joined && (
          <EventSelectionForm
            selectedEventId={selectedEventId}
            allMyEvents={allMyEvents}
            inputMeetingId={inputMeetingId}
            handleEventChange={handleEventChange}
            handleMeetingIdChange={handleMeetingIdChange}
            handleSubmit={handleSubmit}
          />
        )}
        {joined && joined == 'JOINED' ? (
          mMeeting.localParticipant.mode == Constants.modes.CONFERENCE ? (
            <SpeakerView />
          ) : mMeeting.localParticipant.mode == Constants.modes.VIEWER ? (
            <>
              {joinLivestreamRequest && (
                <div className={classes.requestToJoin}>
                  {joinLivestreamRequest.senderName} requested you to join Livestream
                  <button
                    className={`${classes.btn} ${classes.accept}`}
                    onClick={() => {
                      changeMode(joinLivestreamRequest.message);
                      setJoinLivestreamRequest(null);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className={`${classes.btn} ${classes.reject}`}
                    onClick={() => {
                      setJoinLivestreamRequest(null);
                    }}
                  >
                    Reject
                  </button>
                </div>
              )}
              <ViewerView />
            </>
          ) : null
        ) : joined && joined === 'JOINING' ? (
          <p>Joining the meeting...</p>
        ) : (
          <button className={classes.btnJoin} onClick={joinMeeting}>
            Join
          </button>
        )}
      </div>
    </div>
  );
};

Container.propTypes = {
  meetingId: PropTypes.string.isRequired,
  onMeetingLeave: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  allMyEvents: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
};

export default Container;
