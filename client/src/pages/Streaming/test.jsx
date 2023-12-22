/* eslint-disable react/button-has-type */
import PropTypes from 'prop-types';
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
  Constants,
  usePubSub,
} from '@videosdk.live/react-sdk';
import Hls from 'hls.js';
import ReactPlayer from 'react-player';
import { createStructuredSelector } from 'reselect';
import { selectToken, selectUser } from '@containers/Client/selectors';
import { selectAllMyEvents } from '@pages/Dashboard/MyEvents/selectors';
import { connect, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { actionGetAllMyEvent } from '@pages/Dashboard/MyEvents/actions';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { authToken, createMeeting } from './api';
import { actionCreateMeeting } from './actions';

import classes from './style.module.scss';

/* eslint-disable no-nested-ternary */
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
          <button className={classes.buttonCreateMeeting} onClick={() => onClick('CONFERENCE')}>
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
        <button className={classes.buttonJoinStreaming} onClick={() => onClick('CONFERENCE')}>
          Join as Host
        </button>
      ) : (
        <button className={classes.buttonJoinStreaming} onClick={() => onClick('VIEWER')}>
          Join as Viewer
        </button>
      )}
    </div>
  );
};

const ParticipantView = (props) => {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current.play().catch((error) => console.error('videoElem.current.play() failed', error));
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className={classes.participantView} key={props.participantId}>
      <p>
        Participant: {displayName} | Webcam: {webcamOn ? 'ON' : 'OFF'} | Mic: {micOn ? 'ON' : 'OFF'}
      </p>
      <audio ref={micRef} autoPlay muted={isLocal} />
      {webcamOn && (
        <div className={classes.videoWrapper}>
          <ReactPlayer
            className={classes.reactPlayer}
            playsinline // very important prop
            pip={false}
            light={false}
            controls={false}
            muted
            playing
            url={videoStream}
            width="100%"
            height="100%"
            onError={(err) => {
              console.log(err, 'participant video error');
            }}
          />
        </div>
      )}
    </div>
  );
};

const Controls = () => {
  const { leave, toggleMic, toggleWebcam, startHls, stopHls } = useMeeting();
  return (
    <div className={classes.containerControls}>
      <button onClick={() => leave()}>Leave</button>
      <span className={classes.divider} />
      <button onClick={() => toggleMic()}>toggleMic</button>
      <button onClick={() => toggleWebcam()}>toggleWebcam</button>
      <span className={classes.divider} />
      <button
        onClick={() => {
          startHls({
            layout: {
              type: 'SPOTLIGHT',
              priority: 'PIN',
              gridSize: '20',
            },
            theme: 'DARK',
            mode: 'video-and-audio',
            quality: 'high',
            orientation: 'landscape',
          });
        }}
      >
        Start Live Streaming
      </button>
      <button onClick={() => stopHls()}>Stop Live Streaming</button>
    </div>
  );
};

const SpeakerView = () => {
  const { participants, hlsState } = useMeeting();
  const speakers = [...participants.values()].filter((participant) => participant.mode == Constants.modes.CONFERENCE);

  const getHlsStateMessage = () => {
    switch (hlsState) {
      case 'HLS_STOPPED':
        return <p className={${classes.hlsStateMessage} ${classes.hlsStopped}}>Livestreaming belum berjalan.</p>;
      case 'HLS_PLAYABLE':
        return <p className={${classes.hlsStateMessage} ${classes.hlsPlayable}}>Livestreaming sedang berjalan.</p>;
      default:
        return <p className={classes.hlsStateMessage}>Menunggu status livestreaming...</p>;
    }
  };
  return (
    <div className={classes.containerSpeakerView}>
      {getHlsStateMessage()}
      <Controls />
      <div className={classes.videoGrid}>
        {speakers.map((participant) => (
          <ParticipantView participantId={participant.id} key={participant.id} />
        ))}
      </div>
      <ViewerList />
    </div>
  );
};

const ViewerList = () => {
  const { participants } = useMeeting();

  // Filtering only viewer participant
  const viewers = [...participants.values()].filter((participant) => participant.mode == Constants.modes.VIEWER);

  return (
    <div className={classes.viewerList}>
      <p>Viewer list: </p>
      {viewers.map((participant) => (
        <ViewerListItem participantId={participant.id} />
      ))}
    </div>
  );
};

const ViewerListItem = ({ participantId }) => {
  const { displayName } = useParticipant(participantId);
  const { publish } = usePubSub(CHANGE_MODE_${participantId});
  const onClickRequestJoinLiveStream = () => {
    publish('CONFERENCE');
  };
  return (
    <div className={${classes.viewerListItem}}>
      <span className={${classes.viewerListItem}__name}>{displayName}</span>
      <button className={${classes.viewerListItem}__button} onClick={onClickRequestJoinLiveStream}>
        Request to join Livestream
      </button>
    </div>
  );
};

const ViewerView = () => {
  // States to store downstream url and current HLS state
  const playerRef = useRef(null);
  const { hlsUrls, hlsState } = useMeeting();
  const { publish } = usePubSub('REACTION');
  // highlight-start
  function sendEmoji(emoji) {
    publish(emoji);
    // Dispatch custom event here so the local user can see their own emoji
    window.dispatchEvent(new CustomEvent('reaction_added', { detail: { emoji } }));
  }
  useEffect(() => {
    if (hlsUrls.downstreamUrl && hlsState == 'HLS_PLAYABLE') {
      if (Hls.isSupported()) {
        const hls = new Hls({
          maxLoadingDelay: 1, // max video loading delay used in automatic start level selection
          defaultAudioCodec: 'mp4a.40.2', // default audio codec
          maxBufferLength: 0, // If buffer length is/become less than this value, a new fragment will be loaded
          maxMaxBufferLength: 1, // Hls.js will never exceed this value
          startLevel: 0, // Start playback at the lowest quality level
          startPosition: -1, // set -1 playback will start from intialtime = 0
          maxBufferHole: 0.001, // 'Maximum' inter-fragment buffer hole tolerance that hls.js can cope with when searching for the next fragment to load.
          highBufferWatchdogPeriod: 0, // if media element is expected to play and if currentTime has not moved for more than highBufferWatchdogPeriod and if there are more than maxBufferHole seconds buffered upfront, hls.js will jump buffer gaps, or try to nudge playhead to recover playback.
          nudgeOffset: 0.05, // In case playback continues to stall after first playhead nudging, currentTime will be nudged evenmore following nudgeOffset to try to restore playback. media.currentTime += (nb nudge retry -1)*nudgeOffset
          nudgeMaxRetry: 1, // Max nb of nudge retries before hls.js raise a fatal BUFFER_STALLED_ERROR
          maxFragLookUpTolerance: 0.1, // This tolerance factor is used during fragment lookup.
          liveSyncDurationCount: 1, // if set to 3, playback will start from fragment N-3, N being the last fragment of the live playlist
          abrEwmaFastLive: 1, // Fast bitrate Exponential moving average half-life, used to compute average bitrate for Live streams.
          abrEwmaSlowLive: 3, // Slow bitrate Exponential moving average half-life, used to compute average bitrate for Live streams.
          abrEwmaFastVoD: 1, // Fast bitrate Exponential moving average half-life, used to compute average bitrate for VoD streams
          abrEwmaSlowVoD: 3, // Slow bitrate Exponential moving average half-life, used to compute average bitrate for VoD streams
          maxStarvationDelay: 1,
        });

        const player = document.querySelector('#hlsPlayer');

        hls.loadSource(hlsUrls.downstreamUrl);
        hls.attachMedia(player);
      } else if (typeof playerRef.current?.play === 'function') {
        playerRef.current.src = hlsUrls.downstreamUrl;
        playerRef.current.play();
      }
    }
  }, [hlsUrls, hlsState]);

  return (
    <div>
      <div>
        <button
          onClick={() => {
            sendEmoji('confetti');
            publish('confetti');
          }}
        >
          Send 🎉 Reaction
        </button>

        <button
          onClick={() => {
            sendEmoji('clap');
            publish('clap');
          }}
        >
          Send 👏 Reaction
        </button>
      </div>
      {hlsState != 'HLS_PLAYABLE' ? (
        <div>
          <p>HLS has not started yet or is stopped</p>
        </div>
      ) : (
        hlsState == 'HLS_PLAYABLE' && (
          <div>
            <video
              ref={playerRef}
              id="hlsPlayer"
              autoPlay
              controls
              style={{ width: '100%', height: '100%' }}
              playsinline
              playsInline
              muted
              playing
              onError={(err) => {
                console.log(err, 'hls video error');
              }}
            />
          </div>
        )
      )}
    </div>
  );
};

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
    console.log('test');
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

  const pubsub = usePubSub(CHANGE_MODE_${localParticipant?.id}, {
    onMessageReceived: (pubSubMessage) => {
      setJoinLivestreamRequest(pubSubMessage);
    },
  });

  return (
    <div className={classes.containerMeetingId}>
      {/* <FlyingEmojisOverlay /> */}
      {user?.role !== 1 && <div className={classes.meetingId}>Meeting Id: {meetingId}</div>}
      {user?.role !== 1 && !joined && (
        <form onSubmit={handleSubmit} className={classes.form}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Your Active Event</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedEventId}
              label="Yout event"
              onChange={handleEventChange}
            >
              {allMyEvents.map((event) => (
                <MenuItem key={event.id} value={event.id}>
                  {event.eventName} {/* Assuming each event has a 'name' property */}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <input
            className={classes.inputMeetingId}
            placeholder="kirim meeting id ke user"
            value={inputMeetingId}
            onChange={handleMeetingIdChange}
          />
          <button className={classes.btnSendToUser} type="submit">
            Kirim ke pelanggan
          </button>
        </form>
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
                  className={${classes.btn} accept}
                  onClick={() => {
                    changeMode(joinLivestreamRequest.message);
                    setJoinLivestreamRequest(null);
                  }}
                >
                  Accept
                </button>
                <button
                  className={${classes.btn} reject}
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