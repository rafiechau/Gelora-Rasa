/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-nested-ternary */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useMeeting, Constants, usePubSub } from '@videosdk.live/react-sdk';
import { useDispatch } from 'react-redux';
import EventSelectionForm from '@components/EventSelectionForm';
import SpeakerView from '@components/SpeakerView';
import toast from 'react-hot-toast';
import ViewerView from '@components/ViewerView';
import { actionCreateMeeting } from '@pages/Streaming/actions';
import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';

const Container = ({ meetingId, onMeetingLeave, user, allMyEvents }) => {
  const dispatch = useDispatch();
  const [selectedEventId, setSelectedEventId] = useState('');
  const [inputMeetingId, setInputMeetingId] = useState('');
  const [joined, setJoined] = useState(null);
  const { join, localParticipant, changeMode } = useMeeting();

  const handleEventChange = (event) => {
    setSelectedEventId(Number(event.target.value));
  };

  // Fungsi untuk menangani perubahan input Meeting ID
  const handleMeetingIdChange = (event) => {
    setInputMeetingId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!inputMeetingId.trim()) {
      toast.error('Meeting ID is required');
      return;
    }
    dispatch(actionCreateMeeting({ eventId: selectedEventId, meetingId: inputMeetingId }));
  };

  const mMeeting = useMeeting({
    onMeetingJoined: () => {
      if (mMeetingRef.current.localParticipant.mode === 'CONFERENCE') {
        mMeetingRef.current.localParticipant.pin();
      }
      setJoined('JOINED');
    },
    onMeetingLeft: () => {
      onMeetingLeave();
    },
    onParticipantModeChanged: (data) => {
      const { localParticipant } = mMeetingRef.current;
      if (data.participantId === localParticipant.id) {
        if (data.mode === Constants.modes.CONFERENCE) {
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
      {user?.role !== 1 && (
        <h3 className={classes.meetingId}>
          <FormattedMessage id="app_streaming_meeting_id" />: {meetingId}
        </h3>
      )}
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
      {joined && joined === 'JOINED' ? (
        mMeeting.localParticipant.mode === Constants.modes.CONFERENCE ? (
          <SpeakerView />
        ) : mMeeting.localParticipant.mode === Constants.modes.VIEWER ? (
          <>
            {joinLivestreamRequest && (
              <div className={classes.requestToJoin}>
                {joinLivestreamRequest.senderName} <FormattedMessage id="app_streaming_request" />
                <button
                  type="button"
                  className={`${classes.btn} ${classes.accept}`}
                  onClick={() => {
                    changeMode(joinLivestreamRequest.message);
                    setJoinLivestreamRequest(null);
                  }}
                >
                  <FormattedMessage id="app_btn_accept" />
                </button>
                <button
                  type="button"
                  className={`${classes.btn} ${classes.reject}`}
                  onClick={() => {
                    setJoinLivestreamRequest(null);
                  }}
                >
                  <FormattedMessage id="app_btn_reject" />
                </button>
              </div>
            )}
            <ViewerView />
          </>
        ) : null
      ) : joined && joined === 'JOINING' ? (
        <p>
          <FormattedMessage id="app_streaming_joining_streaming" />
        </p>
      ) : (
        <button type="button" className={classes.btnJoin} onClick={joinMeeting}>
          <FormattedMessage id="app_streaming_btn_join" />
        </button>
      )}
    </div>
  );
};

Container.propTypes = {
  meetingId: PropTypes.string,
  onMeetingLeave: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  allMyEvents: PropTypes.array.isRequired,
};

export default Container;
