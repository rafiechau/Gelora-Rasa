import React from 'react';
import { useMeeting } from '@videosdk.live/react-sdk';
import ParticipantView from '@components/ParticipantView';
import Controls from '@components/Controls';
import HlsStateMessage from '@components/HlsStateMessage';
import ViewerList from '@components/ViewerList';
import classes from './style.module.scss'; // Adjust path as needed

const SpeakerView = () => {
  const { participants, hlsState } = useMeeting();
  const speakers = [...participants.values()].filter((participant) => participant.mode === 'CONFERENCE');

  return (
    <div className={classes.containerSpeakerView}>
      <HlsStateMessage hlsState={hlsState} />
      <Controls />
      <div className={classes.videoGrid}>
        {speakers.map((participant) => (
          <ParticipantView key={participant.id} participantId={participant.id} />
        ))}
      </div>
      <ViewerList />
    </div>
  );
};

export default SpeakerView;
