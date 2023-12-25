import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import EventIcon from '@mui/icons-material/Event';
import { FormattedMessage } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import { selectUser } from '@containers/Client/selectors';
import { createStructuredSelector } from 'reselect';
import logo from '@static/images/gelorasa-logo.png';

import { Avatar, Box } from '@mui/material';
import classes from './styles.module.scss';

export const SideBar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={classes.sidebar}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
        <Avatar src={logo} sx={{ width: 80, height: 80, marginRight: 1 }} />
      </Box>

      <div
        className={`${classes.sidebarOption} ${isActive('/') ? classes.active : ''}`}
        onClick={() => handleNavigate('/dashboard')}
      >
        <PersonIcon color={isActive('/') ? 'primary' : 'inherit'} />
        <span>
          <FormattedMessage id="app_navigation_profile" />
        </span>
      </div>
      {user && user.role === 2 && (
        <div onClick={() => handleNavigate('/dashboard/my-events')} className={classes.sidebarOption}>
          <EventIcon color="inherit" />
          <span>
            <FormattedMessage id="app_navigation_my_events" />
          </span>
        </div>
      )}
      {user && user.role === 1 && (
        <div onClick={() => handleNavigate('/dashboard/my-orders')} className={classes.sidebarOption}>
          <HistoryIcon color="inherit" />
          <span>
            <FormattedMessage id="app_navigation_history_orders" />
          </span>
        </div>
      )}

      {user && user.role === 3 && (
        <div>
          <div onClick={() => handleNavigate('/dashboard/categories')} className={classes.sidebarOption}>
            <CategoryIcon color="inherit" />
            <span>
              <FormattedMessage id="app_navigation_categories" />
            </span>
          </div>
          <div onClick={() => handleNavigate('/dashboard/locations')} className={classes.sidebarOption}>
            <LocationOnIcon color="inherit" />
            <span>
              <FormattedMessage id="app_navigation_location" />
            </span>
          </div>
          <div onClick={() => handleNavigate('/dashboard/users')} className={classes.sidebarOption}>
            <GroupIcon color="inherit" />
            <span>
              <FormattedMessage id="app_navigation_all_users" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

SideBar.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default connect(mapStateToProps)(SideBar);
