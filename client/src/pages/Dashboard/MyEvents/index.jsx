import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import { SideBar } from '@components/sidebar';
import { Box, Fab, Typography } from '@mui/material';
import BottomBar from '@components/BottomNavigation';
import AddIcon from '@mui/icons-material/Add';
import { selectToken, selectUser } from '@containers/Client/selectors';
import CardMyEvent from '@components/CardMyEvent';
import EventDialog from '@components/EventDialog';
import classes from '../style.module.scss';
import { selectAllMyEvents } from './selectors';
import { actionGetAllMyEvent } from './actions';

const MyEventsPage = ({ allMyEvents, token, user }) => {
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };


  useEffect(() => {
    if (token) {
      dispatch(actionGetAllMyEvent({ token }));
    }
  }, [dispatch, token]);

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
          <button type="button" onClick={handleOpenDialog}>
            Tambah Category
          </button>
          {allMyEvents.length > 0 ? (
            allMyEvents.map((myEvent) => <CardMyEvent key={myEvent.id} myEvent={myEvent} />)
          ) : (
            <Typography>
              <FormattedMessage id="app_no_post_available" />
            </Typography>
          )}
        </div>
      </div>
      {isDialogOpen && <EventDialog open={isDialogOpen} onClose={handleCloseDialog} mode="create" />}
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
