import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useEffect, useRef, useState } from 'react';
import { SideBar } from '@components/sidebar';
import { Box, Fab } from '@mui/material';
import { BottomBar } from '@components/BottomNavigation';
import AddIcon from '@mui/icons-material/Add';
import { selectUser } from '@containers/Client/selectors';
import classes from '../style.module.scss';

const ProfilePage = ({ user }) => {
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {

  });

  const handleImageChange = (e) => {};

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
          <div>My Profiles</div>
        </div>
      </div>
    </div>
  );
};

ProfilePage.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default injectIntl(connect(mapStateToProps)(ProfilePage));
