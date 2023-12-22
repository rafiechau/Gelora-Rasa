import PropTypes from 'prop-types';
import classes from './style.module.scss';

const HlsStateMessage = ({ hlsState }) => {
  const getMessage = () => {
    switch (hlsState) {
      case 'HLS_STOPPED':
        return 'Livestreaming belum berjalan.';
      case 'HLS_PLAYABLE':
        return 'Livestreaming sedang berjalan.';
      default:
        return 'Menunggu status livestreaming...';
    }
  };

  return <p className={`${classes.hlsStateMessage} ${classes[hlsState]}`}>{getMessage()}</p>;
};

HlsStateMessage.propTypes = {
  hlsState: PropTypes.string.isRequired,
};

export default HlsStateMessage;
