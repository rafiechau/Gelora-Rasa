import { useMeeting } from '@videosdk.live/react-sdk';
import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';

const Controls = () => {
  const { leave, toggleMic, toggleWebcam, startHls, stopHls } = useMeeting();
  return (
    <div className={classes.controlsContainer}>
      <button type="button" onClick={() => leave()}>
        <FormattedMessage id="app_btn_leave" />
      </button>
      <span className={classes.divider} />
      <button type="button" onClick={() => toggleMic()}>
        <FormattedMessage id="app_btn_toggleMic" />
      </button>
      <button type="button" onClick={() => toggleWebcam()}>
        <FormattedMessage id="app_btn_toggleWebcam" />
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
        <FormattedMessage id="app_btn_start_livestreaming" />
      </button>
      <button type="button" onClick={() => stopHls()}>
        <FormattedMessage id="app_btn_stop_livestreaming" />
      </button>
    </div>
  );
};

export default Controls;
