import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import EventIcon from '@mui/icons-material/Event';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useLocation, useNavigate } from 'react-router-dom';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import { selectUser } from '@containers/Client/selectors';
import { createStructuredSelector } from 'reselect';
import classes from './styles.module.scss';

export const SideBar = ({ onOpenEventDialog, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const navigateToMyProfile = () => {
    navigate('/profile');
  };

  const navigateToMyEvents = () => {
    navigate('/my-events');
  };

  const navigateToMyOrders = () => {
    navigate('/my-orders');
  };

  const navigateToLocation = () => {
    navigate('/dashboard/locations');
  };

  const navigateToCategories = () => {
    navigate('/dashboard/categories');
  };

  const navigateToAllUsers = () => {
    navigate('/dashboard/users');
  };
  return (
    <div className={classes.sidebar}>
      <LocalActivityIcon className={classes.sidebarEventIcon} />

      <div className={`${classes.sidebarOption} ${isActive('/') ? classes.active : ''}`} onClick={navigateToMyProfile}>
        <PersonIcon color={isActive('/') ? 'primary' : 'inherit'} />
        <span>
          <FormattedMessage id="app_navigation_profile" />
        </span>
      </div>
      {user && user.role === 2 && (
        <div onClick={navigateToMyEvents} className={classes.sidebarOption}>
          <EventIcon color="inherit" />
          <span>
            <FormattedMessage id="app_navigation_my_events" />
          </span>
        </div>
      )}
      {user && user.role === 1 && (
        <div onClick={navigateToMyOrders} className={classes.sidebarOption}>
          <HistoryIcon color="inherit" />
          <span>
            <FormattedMessage id="app_navigation_history_orders" />
          </span>
        </div>
      )}

      {user && user.role === 3 && (
        <div>
          <div onClick={navigateToCategories} className={classes.sidebarOption}>
            <CategoryIcon color="inherit" />
            <span>
              <FormattedMessage id="app_navigation_categories" />
            </span>
          </div>
          <div onClick={navigateToLocation} className={classes.sidebarOption}>
            <LocationOnIcon color="inherit" />
            <span>
              <FormattedMessage id="app_navigation_location" />
            </span>
          </div>
          <div onClick={navigateToAllUsers} className={classes.sidebarOption}>
            <GroupIcon color="inherit" />
            <span>
              <FormattedMessage id="app_navigation_all_users" />
            </span>
          </div>
        </div>
      )}
      <button type="submit" className={classes.sidebarCreateEvent} onClick={onOpenEventDialog}>
        <span>
          <FormattedMessage id="app_navigation_create_event" />
        </span>
      </button>
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
