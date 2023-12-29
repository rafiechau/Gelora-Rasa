import { Constants, useMeeting } from '@videosdk.live/react-sdk';

import ViewerListItem from '@components/ViewerListItem';
import classes from './style.module.scss';
import { FormattedMessage } from 'react-intl';

const ViewerList = () => {
  const { participants } = useMeeting();

  const viewers = [...participants.values()].filter((participant) => participant.mode === Constants.modes.VIEWER);

  return (
    <div className={classes.viewerList}>
      <p>
        <FormattedMessage id="app_viewer_list" />:
      </p>
      {viewers.map((participant) => (
        <ViewerListItem key={participant.id} participantId={participant.id} />
      ))}
    </div>
  );
};

export default ViewerList;
