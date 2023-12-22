import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useEffect, useState } from 'react';
import { SideBar } from '@components/sidebar';
import { Box, Fab } from '@mui/material';
import BottomBar from '@components/BottomNavigation';
import AddIcon from '@mui/icons-material/Add';
import { selectToken, selectUser } from '@containers/Client/selectors';
import { selectAllLocation } from '@pages/Home/selectors';
import { actionGetAllLocation } from '@pages/Home/actions';
import DeleteConfirmationDialog from '@components/DeleteConfirmationDialog';
import LocationDialog from '@components/LocationDialog';
import AdminTable from '@components/AdminTable';
import { actionDeleteLocationById } from './actions';

import classes from '../style.module.scss';

const LocationAdminPage = ({ locations, user, token, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [currentLocationId, setCurrentLocationId] = useState(null);
  const [currentEditingLocation, setCurrentEditingLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemsPerPage = 10;

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
    dispatch(actionDeleteLocationById(currentLocationId, token));
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

  const locationColumns = [{ id: 'name', label: 'Nama Lokasi' }];

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
          onClick={() => handleCreate()}
          sx={{ position: 'fixed', bottom: 60, right: 16 }}
        >
          <AddIcon />
        </Fab>
      </Box>
      <div className={classes.ProfilePage}>
        <SideBar user={user} />
        <div className={classes.containerProfilePage}>
          <div className={classes.title}>
            <FormattedMessage id="app_header_dashboard_location" />
          </div>
          <div className={classes.searchContainer}>
            <input
              type="text"
              placeholder={formatMessage({ id: 'app_input_search_location' })}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button className={classes.btnCreate} type="button" onClick={() => handleCreate()}>
            <FormattedMessage id="app_header_create_location" />
          </button>
          <AdminTable
            columns={locationColumns}
            data={currentLocations.map((location) => ({ id: location.id, name: location.namaProvinsi }))}
            onEdit={handleEdit}
            onDelete={handleDelete}
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
  token: PropTypes.string,
  user: PropTypes.object.isRequired,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  locations: selectAllLocation,
  token: selectToken,
  user: selectUser,
});

export default injectIntl(connect(mapStateToProps)(LocationAdminPage));
