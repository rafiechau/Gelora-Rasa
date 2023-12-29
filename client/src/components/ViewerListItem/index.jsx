// ViewerListItem.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useParticipant, usePubSub } from '@videosdk.live/react-sdk';
import classes from './style.module.scss'; // Adjust the path
import { FormattedMessage } from 'react-intl';

const ViewerListItem = ({ participantId }) => {
  const { displayName } = useParticipant(participantId);
  const { publish } = usePubSub(`CHANGE_MODE_${participantId}`);

  const onClickRequestJoinLiveStream = () => {
    publish('CONFERENCE');
  };

  return (
    <div className={classes.viewerListItem}>
      <span className={classes.name}>{displayName}</span>
      <button type="button" className={classes.button} onClick={onClickRequestJoinLiveStream}>
        <FormattedMessage id="app_streaming_request" />
      </button>
    </div>
  );
};

ViewerListItem.propTypes = {
  participantId: PropTypes.string.isRequired,
};

export default ViewerListItem;
