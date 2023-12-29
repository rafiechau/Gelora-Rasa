// ParticipantView.jsx
import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { useParticipant } from '@videosdk.live/react-sdk';
import classes from './style.module.scss';
import { FormattedMessage } from 'react-intl';

const ParticipantView = ({ participantId }) => {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(participantId);

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
    <div className={classes.participantView}>
      <p>
        <FormattedMessage id="app_text_participant" />: {displayName} | <FormattedMessage id="app_text_webcam" />:{' '}
        {webcamOn ? 'ON' : 'OFF'} | <FormattedMessage id="app_text_mic" />: {micOn ? 'ON' : 'OFF'}
      </p>
      <audio ref={micRef} autoPlay muted={isLocal}>
        <track kind="captions" />
      </audio>
      {webcamOn && (
        <div className={classes.videoWrapper}>
          <ReactPlayer
            className={classes.reactPlayer}
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted
            playing
            url={videoStream}
            width="100%"
            height="100%"
            onError={(err) => console.log(err, 'participant video error')}
          />
        </div>
      )}
    </div>
  );
};

ParticipantView.propTypes = {
  participantId: PropTypes.string.isRequired,
};

export default ParticipantView;
