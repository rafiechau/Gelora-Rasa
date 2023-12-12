/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import { MeetingProvider, useMeeting, useParticipant } from '@videosdk.live/react-sdk';
import { useEffect, useMemo, useRef, useState } from 'react';
import { injectIntl } from 'react-intl';
import ReactPlayer from 'react-player';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { authToken, createMeeting, fetchHlsDownstreamUrl } from './api';

const JoinScreen = ({ getMeetingAndToken }) => {
  const [meetingId, setMeetingId] = useState(null);
  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <button type="button" onClick={onClick}>
        Join
      </button>
      {' or '}
      <button type="button" onClick={onClick}>
        Create Meeting
      </button>
    </div>
  );
};

const HLSJoinScreen = ({ onDownstreamUrl }) => {
  const [meetingId, setMeetingId] = useState(null);

  const handleOnClick = async (meetingId) => {
    const downstreamUrl = await fetchHlsDownstreamUrl({ meetingId });

    onDownstreamUrl(downstreamUrl);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          handleOnClick(meetingId);
        }}
      >
        Join
      </button>
    </div>
  );
};

const VideoComponent = (props) => {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn } = useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn) {
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
    <div key={props.participantId}>
      {micOn && micRef && <audio ref={micRef} autoPlay />}
      {webcamOn && (
        <ReactPlayer
          //
          playsinline // very very imp prop
          pip={false}
          light={false}
          controls
          muted
          playing
          //
          url={videoStream}
          //
          height="180px"
          width="320px"
          onError={(err) => {
            console.log(err, 'participant video error');
          }}
        />
      )}
    </div>
  );
};

const Controls = () => {
  const { leave, toggleMic, toggleWebcam } = useMeeting();
  return (
    <div>
      <button onClick={leave}>Leave</button>
      <button onClick={toggleMic}>toggleMic</button>
      <button onClick={toggleWebcam}>toggleWebcam</button>
    </div>
  );
};

const Container = (props) => {
  const { participants, join, isMeetingJoined, startHls } = useMeeting({
    onMeetingJoined: () => {
      startHls();
    },
    onHlsStarted: (downstreamUrl) => {},
  });

  return (
    <div className="container">
      <h3>Meeting Id: {props.meetingId}</h3>
      {isMeetingJoined ? (
        <div>
          <Controls />
          {[...participants.keys()].map((participantId) => (
            <VideoComponent key={participantId} participantId={participantId} />
          ))}
        </div>
      ) : (
        <button type="button" onClick={join}>
          Join
        </button>
      )}
    </div>
  );
};

const MeetingContainer = () => {
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingAndToken = async (id) => {
    const meetingId = id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: 'Chintan',
      }}
      token={authToken}
    >
      <Container meetingId={meetingId} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
};

const HLSPlayer = ({ url, handleOnLeave }) => (
  <>
    <button type="button" onClick={handleOnLeave}>
      Leave
    </button>
    <ReactPlayer playing playsinline height="70%" width="60%" url={url} />
  </>
);

const HLSContainer = () => {
  const [downstreamUrl, setDownstreamUrl] = useState('');

  const isJoined = useMemo(() => !!downstreamUrl, [downstreamUrl]);

  return isJoined ? (
    <HLSPlayer
      url={downstreamUrl}
      handleOnLeave={() => {
        setDownstreamUrl('');
      }}
    />
  ) : (
    <HLSJoinScreen
      onDownstreamUrl={(_downstreamUrl) => {
        setDownstreamUrl(_downstreamUrl);
      }}
    />
  );
};

const LiveStreamingPage = () => {
  const [mode, setMode] = useState('host');

  const isHost = useMemo(() => mode === 'host', [mode]);

  useEffect(() => {
    fetchHlsDownstreamUrl({ meetingId: '0g7p-kgnq-spd5' });
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setMode((s) => (s === 'host' ? 'viewer' : 'host'));
        }}
      >
        {isHost ? 'Join as a Viewer' : 'Join as a Host'}
      </button>
      {isHost ? <MeetingContainer /> : <HLSContainer />}
    </>
  );
};

LiveStreamingPage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export default injectIntl(connect(mapStateToProps)(LiveStreamingPage));
