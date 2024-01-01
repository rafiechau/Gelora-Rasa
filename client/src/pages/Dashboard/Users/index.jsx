import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import { SideBar } from '@components/sidebar';
import { Box } from '@mui/material';
import BottomBar from '@components/BottomNavigation';
import { selectUser } from '@containers/Client/selectors';
import DeleteConfirmationDialog from '@components/DeleteConfirmationDialog';
import UserDetailsDialog from '@components/UserDetailsDialog';
import AdminTable from '@components/AdminTable';
import { useNavigate } from 'react-router-dom';
import { selectAllUsers } from './selectors';
import { actionDeleteUserById, actionGetAllUsers } from './actions';

import classes from '../style.module.scss';

const UsersAdminPage = ({ user, allUsers, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [openEventOrganizerDialog, setOpenEventOrganizerDialog] = useState(false);
  const [selectedEventOrganizer, setSelectedEventOrganizer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getRoleName = (role) => {
    switch (role) {
      case 1:
        return 'Standard User';
      case 2:
        return 'Event Organizer';
      case 3:
        return 'Admin';
      default:
        return 'Unknown Role';
    }
  };

  useEffect(() => {
    if (user?.role !== 3) {
      navigate('/home');
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(actionGetAllUsers(currentPage, itemsPerPage));
  }, [dispatch, currentPage, itemsPerPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setCurrentUserId(null);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleDelete = (userId) => {
    setCurrentUserId(userId);
    handleOpenConfirmDialog();
  };

  const handleConfirmDelete = () => {
    dispatch(actionDeleteUserById(currentUserId));
    handleCloseConfirmDialog();
  };

  const handleOpenEventOrganizerDialog = (eventOrganizer) => {
    setSelectedEventOrganizer(eventOrganizer);
    setOpenEventOrganizerDialog(true);
  };

  const handleCloseEventOrganizerDialog = () => {
    setOpenEventOrganizerDialog(false);
    setSelectedEventOrganizer(null);
  };

  const filteredUsers = allUsers?.filter((dataUser) => {
    const fullName = `${dataUser?.firstName} ${dataUser?.lastName || ''}`.toLowerCase();
    const matchesSearchTerm = fullName.includes(searchTerm.toLowerCase());
    const matchesRoleFilter = roleFilter === 'all' || dataUser.role.toString() === roleFilter;
    return matchesSearchTerm && matchesRoleFilter;
  });

  const userColumns = [
    { id: 'fullName', messageId: 'app_column_name', label: 'Name' },
    { id: 'email', messageId: 'app_column_email', label: 'Email' },
    { id: 'role', messageId: 'app_column_role', label: 'Role' },
  ];

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
          <div>
            <FormattedMessage id="app_dashboard_users_headers" />
          </div>
          <div className={classes.searchContainer}>
            <input
              type="text"
              placeholder={formatMessage({ id: 'app_dashboard_search_user' })}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="all">
                <FormattedMessage id="app_dashboard_users_filter_all_role" />
              </option>
              <option value="1">
                <FormattedMessage id="app_dashboard_users_filter_standard_role" />
              </option>
              <option value="2">
                <FormattedMessage id="app_dashboard_users_filter_event_organizer" />
              </option>
              <option value="3">
                <FormattedMessage id="app_dashboard_users_filter_admin_role" />
              </option>
            </select>
          </div>
          <AdminTable
            columns={userColumns}
            data={filteredUsers.map((dataUser) => ({
              ...dataUser,
              fullName: dataUser.firstName + (dataUser.lastName ? ` ${dataUser.lastName}` : ''),
              email: dataUser.email,
              role: getRoleName(dataUser.role),
            }))}
            onEdit={handleOpenEventOrganizerDialog}
            onDelete={(userId) => handleDelete(userId)}
            editButtonMessageId="app_btn_view_details"
          />
          <div className={classes.paginationControls}>
            <button type="button" onClick={handlePreviousPage} disabled={currentPage === 1}>
              <FormattedMessage id="app_btn_previous_pagination" />
            </button>
            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage === Math.ceil(allUsers.length / itemsPerPage)}
            >
              <FormattedMessage id="app_btn_next_pagination" />
            </button>
          </div>
          <UserDetailsDialog
            open={openEventOrganizerDialog}
            onClose={handleCloseEventOrganizerDialog}
            user={selectedEventOrganizer}
          />
          <DeleteConfirmationDialog
            open={openConfirmDialog}
            onConfirm={handleConfirmDelete}
            onCancel={handleCloseConfirmDialog}
            dialogTitle={<FormattedMessage id="app_confirmation_delete_dialog" />}
            dialogContent={<FormattedMessage id="app_delete_dialog_header" />}
          />
        </div>
      </div>
    </div>
  );
};

UsersAdminPage.propTypes = {
  user: PropTypes.object,
  allUsers: PropTypes.array,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  allUsers: selectAllUsers,
});

export default injectIntl(connect(mapStateToProps)(UsersAdminPage));
