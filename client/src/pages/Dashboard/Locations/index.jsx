import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import { SideBar } from '@components/sidebar';
import { Box, Fab, useMediaQuery } from '@mui/material';
import BottomBar from '@components/BottomNavigation';
import AddIcon from '@mui/icons-material/Add';
import { selectUser } from '@containers/Client/selectors';
import { selectAllLocation } from '@pages/Home/selectors';
import { actionGetAllLocation } from '@pages/Home/actions';
import DeleteConfirmationDialog from '@components/DeleteConfirmationDialog';
import LocationDialog from '@components/LocationDialog';
import AdminTable from '@components/AdminTable';
import { useNavigate } from 'react-router-dom';
import { actionDeleteLocationById } from './actions';

import classes from '../style.module.scss';

const LocationAdminPage = ({ locations, user, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [currentLocationId, setCurrentLocationId] = useState(null);
  const [currentEditingLocation, setCurrentEditingLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemsPerPage = 10;

  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (user?.role !== 3) {
      navigate('/home');
    }
  }, [user, navigate]);

  useEffect(() => {
    dispatch(actionGetAllLocation());
  }, [dispatch]);

  const handleCreate = () => {
    setCurrentEditingLocation(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (location) => {
    setCurrentEditingLocation(location);
    setIsDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setCurrentLocationId(null);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleDelete = (locationId) => {
    setCurrentLocationId(locationId);
    handleOpenConfirmDialog();
  };

  const handleConfirmDelete = () => {
    dispatch(actionDeleteLocationById(currentLocationId));
    handleCloseConfirmDialog();
  };

  const filteredLocations = locations.filter((location) => {
    const locationSearchTerm = location?.namaProvinsi?.toLowerCase();
    const matchesSearchTerm = locationSearchTerm.includes(searchTerm.toLowerCase());
    return matchesSearchTerm;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLocations = filteredLocations.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const locationColumns = [{ id: 'name', messageId: 'app_column_name_location', label: 'Nama Lokasi' }];

  // { id: 'fullName', messageId: 'app_column_name', label: 'Name' },
  //   { id: 'email', messageId: 'app_column_email', label: 'Email' },
  //   { id: 'role', messageId: 'app_column_role', label: 'Role' },
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
            <FormattedMessage id="app_header_dashboard_location" />
          </div>
          <div className={classes.searchContainer}>
            <input
              className={classes.searchInput}
              type="text"
              placeholder={formatMessage({ id: 'app_input_search_location' })}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {isMobile ? (
              <Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={() => handleCreate()}
                sx={{ position: 'fixed', bottom: 60, right: 16 }}
              >
                <AddIcon />
              </Fab>
            ) : (
              <button className={classes.btnCreate} type="button" onClick={() => handleCreate()}>
                <FormattedMessage id="app_header_create_location" />
              </button>
            )}
          </div>

          <AdminTable
            columns={locationColumns}
            data={currentLocations.map((location) => ({ id: location.id, name: location.namaProvinsi }))}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showEditButton
            showDeleteButton
            editButtonMessageId="app_btn_edit"
          />
          <button type="button" onClick={handlePrevious} disabled={currentPage === 1}>
            <FormattedMessage id="app_btn_previous_pagination" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage === Math.ceil(filteredLocations.length / itemsPerPage)}
          >
            <FormattedMessage id="app_btn_next_pagination" />
          </button>
          <DeleteConfirmationDialog
            open={openConfirmDialog}
            onConfirm={handleConfirmDelete}
            onCancel={handleCloseConfirmDialog}
            dialogTitle={<FormattedMessage id="app_confirmation_delete_dialog" />}
            dialogContent={<FormattedMessage id="app_delete_dialog_header" />}
          />
          <LocationDialog
            open={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            currentLocation={currentEditingLocation}
          />
        </div>
      </div>
    </div>
  );
};

LocationAdminPage.propTypes = {
  locations: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locations: selectAllLocation,
  user: selectUser,
});

export default injectIntl(connect(mapStateToProps)(LocationAdminPage));
