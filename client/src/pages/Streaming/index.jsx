/* eslint-disable no-shadow */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { MeetingProvider, MeetingConsumer } from '@videosdk.live/react-sdk';
import { createStructuredSelector } from 'reselect';
import { selectToken, selectUser } from '@containers/Client/selectors';
import { selectAllMyEvents } from '@pages/Dashboard/MyEvents/selectors';
import { connect, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { actionGetAllMyEvent } from '@pages/Dashboard/MyEvents/actions';
import JoinScreen from '@components/JoinScreen';
import { selectAllMyOrders } from '@pages/Dashboard/Orders/selectors';
import { actionGetAllMyOrders } from '@pages/Dashboard/Orders/actions';
import Container from '@components/Container';
import { authToken, createMeeting } from './api';

import classes from './style.module.scss';

const LiveStreamingPage = ({ user, allMyEvents, token, allMyOrders }) => {
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
    if (token && user?.role === 1) {
      dispatch(actionGetAllMyOrders({ token }));
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
      <JoinScreen
        getMeetingAndToken={getMeetingAndToken}
        setMode={setMode}
        user={user}
        token={token}
        allMyOrders={allMyOrders}
      />
    </div>
  );
};

LiveStreamingPage.propTypes = {
  user: PropTypes.object.isRequired,
  allMyEvents: PropTypes.array,
  token: PropTypes.string,
  allMyOrders: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  allMyEvents: selectAllMyEvents,
  token: selectToken,
  allMyOrders: selectAllMyOrders,
});

export default injectIntl(connect(mapStateToProps)(LiveStreamingPage));
