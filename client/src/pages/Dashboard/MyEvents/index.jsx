import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import { SideBar } from '@components/sidebar';
import toast from 'react-hot-toast';
import { Box, Fab, Typography, useMediaQuery } from '@mui/material';
import BottomBar from '@components/BottomNavigation';
import AddIcon from '@mui/icons-material/Add';
import { selectLogin, selectToken, selectUser } from '@containers/Client/selectors';
import CardMyEvent from '@components/CardMyEvent';
import EventDialog from '@components/EventDialog';
import { useNavigate } from 'react-router-dom';
import classes from '../style.module.scss';
import { selectAllMyEvents } from './selectors';
import { actionGetAllMyEvent } from './actions';

const MyEventsPage = ({ allMyEvents, token, user, login, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const isMobile = useMediaQuery('(max-width:600px)');

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  useEffect(() => {
    if (user?.role !== 2) {
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    }
  }, [formatMessage, user, navigate]);

  useEffect(() => {
    if (token) {
      dispatch(actionGetAllMyEvent({ token }));
    }
  }, [dispatch, token]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEvents = allMyEvents.filter(
    (event) => event.eventName && event.eventName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      </Box>
      <div className={classes.ProfilePage}>
        <SideBar user={user} />
        <div className={classes.containerProfilePage}>
          <div className={classes.title}>
            <FormattedMessage id="app_header_my_events" />
          </div>
          <div className={classes.searchContainer}>
            <input
              className={classes.searchInput}
              type="text"
              placeholder={formatMessage({ id: 'app_input_search_my_events' })}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {isMobile ? (
              <Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={handleOpenDialog}
                sx={{ position: 'fixed', bottom: 60, right: 16 }}
              >
                <AddIcon />
              </Fab>
            ) : (
              <button className={classes.btnCreate} type="button" onClick={handleOpenDialog}>
                <FormattedMessage id="app_header_create_location" />
              </button>
            )}
          </div>
          {filteredEvents.length > 0 ? (
            filteredEvents.map((myEvent) => <CardMyEvent key={myEvent.id} myEvent={myEvent} />)
          ) : (
            <Typography>
              <FormattedMessage id="app_no_data_available" />
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
  login: PropTypes.bool,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  allMyEvents: selectAllMyEvents,
  token: selectToken,
  user: selectUser,
  login: selectLogin,
});

export default injectIntl(connect(mapStateToProps)(MyEventsPage));
