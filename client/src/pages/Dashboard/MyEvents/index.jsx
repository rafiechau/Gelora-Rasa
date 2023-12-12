import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useEffect, useRef, useState } from 'react';
import { SideBar } from '@components/sidebar';
import { Box, Card, CardContent, CardMedia, Fab, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BottomBar } from '@components/BottomNavigation';
import AddIcon from '@mui/icons-material/Add';
import { selectToken, selectUser } from '@containers/Client/selectors';
import config from '@config/index';
import { useNavigate } from 'react-router-dom';
import CardMyEvent from '@components/CardMyEvent';
import classes from '../style.module.scss';
import { selectAllMyEvents } from './selectors';
import { actionGetAllMyEvent } from './actions';

const MyEventsPage = ({ allMyEvents, token, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  useEffect(() => {
    if (token) {
      dispatch(actionGetAllMyEvent({ token }));
    }
  }, [dispatch, token]);

  // console.log(user)

  return (
    <div className={classes.app}>
      <Box
        sx={{
          width: '100%',
          display: { xs: 'block', sm: 'none' },
          position: 'fixed',
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <BottomBar />
        <Fab
          color="primary"
          aria-label="add"
          className={classes.fab}
          // onClick={handleOpenCreatePostDialog}
          sx={{ position: 'fixed', bottom: 60, right: 16 }}
        >
          <AddIcon />
        </Fab>
      </Box>
      <div className={classes.ProfilePage}>
        <SideBar user={user} />
        <div className={classes.containerProfilePage}>
          <div>My Events</div>
          {allMyEvents.length > 0 ? (
            allMyEvents.map((myEvent) => <CardMyEvent key={myEvent.id} myEvent={myEvent} />)
          ) : (
            <Typography>
              <FormattedMessage id="app_no_post_available" />
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};

MyEventsPage.propTypes = {
  allMyEvents: PropTypes.array,
  token: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  allMyEvents: selectAllMyEvents,
  token: selectToken,
  user: selectUser,
});

export default injectIntl(connect(mapStateToProps)(MyEventsPage));
