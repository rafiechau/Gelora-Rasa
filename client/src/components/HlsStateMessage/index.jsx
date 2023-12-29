import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';

const HlsStateMessage = ({ hlsState }) => {
  let messageId;
  switch (hlsState) {
    case 'HLS_STOPPED':
      messageId = 'hls_state_stopped';
      break;
    case 'HLS_PLAYABLE':
      messageId = 'hls_state_playable';
      break;
    default:
      messageId = 'hls_state_waiting';
  }
  return (
    <p className={`${classes.hlsStateMessage} ${classes[hlsState]}`}>
      <FormattedMessage id={messageId} />
    </p>
  );
};

HlsStateMessage.propTypes = {
  hlsState: PropTypes.string.isRequired,
};

export default HlsStateMessage;
