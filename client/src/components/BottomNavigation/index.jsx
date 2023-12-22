import PropTypes from 'prop-types';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import GroupIcon from '@mui/icons-material/Group';
import CategoryIcon from '@mui/icons-material/Category';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectUser } from '@containers/Client/selectors';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

const BottomBar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define navigation items
  const navItems = [
    { label: 'app_navigation_profile', icon: <PersonIcon />, route: '/dashboard', roles: [1, 2, 3] },
    { label: 'app_navigation_my_events', icon: <EventIcon />, route: '/dashboard/my-events', roles: [2] },
    { label: 'app_navigation_history_orders', icon: <HistoryIcon />, route: '/dashboard/my-orders', roles: [1] },
    { label: 'app_navigation_categories', icon: <CategoryIcon />, route: '/dashboard/categories', roles: [3] },
    { label: 'app_navigation_location', icon: <LocationOnIcon />, route: '/dashboard/locations', roles: [3] },
    { label: 'app_navigation_all_users', icon: <GroupIcon />, route: '/dashboard/users', roles: [3] },
  ];

  const getActiveTab = (path) => {
    const index = navItems.findIndex((item) => item.route === path);
    return index >= 0 ? index : 0;
  };

  const handleChange = (event, newValue) => {
    navigate(navItems[newValue].route);
  };

  const activeTab = getActiveTab(location.pathname);
  return (
    <BottomNavigation showLabels value={activeTab} onChange={handleChange}>
      {navItems.map(
        (item, index) =>
          user &&
          item.roles.includes(user.role) && (
            <BottomNavigationAction key={index} label={<FormattedMessage id={item.label} />} icon={item.icon} />
          )
      )}
    </BottomNavigation>
  );
};

BottomBar.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
});

export default connect(mapStateToProps)(BottomBar);
