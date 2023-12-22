/* eslint-disable no-nested-ternary */
/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useRef } from 'react';
import { MeetingProvider, MeetingConsumer, useMeeting, Constants, usePubSub } from '@videosdk.live/react-sdk';
import Hls from 'hls.js';
import { createStructuredSelector } from 'reselect';
import { selectToken, selectUser } from '@containers/Client/selectors';
import { selectAllMyEvents } from '@pages/Dashboard/MyEvents/selectors';
import { connect, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { actionGetAllMyEvent } from '@pages/Dashboard/MyEvents/actions';
import JoinScreen from '@components/JoinScreen';
import EventSelectionForm from '@components/EventSelectionForm';
import SpeakerView from '@components/SpeakerView';
import ViewerView from '@components/ViewerView';
import { authToken, createMeeting } from './api';
import { actionCreateMeeting } from './actions';

import classes from './style.module.scss';

const Container = ({ meetingId, onMeetingLeave, user, allMyEvents, token }) => {
  const dispatch = useDispatch();
  const [selectedEventId, setSelectedEventId] = useState('');
  const [inputMeetingId, setInputMeetingId] = useState('');
  const [joined, setJoined] = useState(null);
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

  const [joinLivestreamRequest, setJoinLivestreamRequest] = useState();

  const pubsub = usePubSub(`CHANGE_MODE_${localParticipant?.id}`, {
    onMessageReceived: (pubSubMessage) => {
      setJoinLivestreamRequest(pubSubMessage);
    },
  });

  return (
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
  );
};

const LiveStreamingPage = ({ user, allMyEvents, token }) => {
  const dispatch = useDispatch();
  const [meetingId, setMeetingId] = useState(null);
  const [mode, setMode] = useState('CONFERENCE');
  const getMeetingAndToken = async (id) => {
    const meetingId = id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const userName = user?.firstName || 'Guest';

  useEffect(() => {
    if (token && user?.role === 2) {
      dispatch(actionGetAllMyEvent({ token }));
    }
  }, [dispatch, token]);

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <div className={classes.streamingPage}>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: userName,
          mode,
        }}
        token={authToken}
      >
        <MeetingConsumer>
          {() => (
            <Container
              meetingId={meetingId}
              onMeetingLeave={onMeetingLeave}
              user={user}
              allMyEvents={allMyEvents}
              token={token}
            />
          )}
        </MeetingConsumer>
      </MeetingProvider>
    </div>
  ) : (
    <div className={classes.streamingPage}>
      <JoinScreen getMeetingAndToken={getMeetingAndToken} setMode={setMode} user={user} />
    </div>
  );
};

LiveStreamingPage.propTypes = {
  user: PropTypes.object.isRequired,
  allMyEvents: PropTypes.array,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  allMyEvents: selectAllMyEvents,
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(LiveStreamingPage));
