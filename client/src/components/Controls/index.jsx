import { useMeeting } from '@videosdk.live/react-sdk';
import classes from './style.module.scss';

const Controls = () => {
  const { leave, toggleMic, toggleWebcam, startHls, stopHls } = useMeeting();
  return (
    <div>
      <button type="button" onClick={() => leave()}>
        Leave
      </button>
      <span className={classes.divider} />
      <button type="button" onClick={() => toggleMic()}>
        toggleMic
      </button>
      <button type="button" onClick={() => toggleWebcam()}>
        toggleWebcam
      </button>
      <span className={classes.divider} />
      <button
        type="button"
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
      <button type="button" onClick={() => stopHls()}>
        Stop Live Streaming
      </button>
    </div>
  );
};

export default Controls;
