import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useEffect, useRef, useState } from 'react';
import { SideBar } from '@components/sidebar';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { BottomBar } from '@components/BottomNavigation';
import AddIcon from '@mui/icons-material/Add';
import { selectToken, selectUser } from '@containers/Client/selectors';
import { selectAllLocation } from '@pages/Home/selectors';
import { actionGetAllLocation } from '@pages/Home/actions';
import EditDataDialog from '@components/EditDataDialog';
import CreateLocationDialog from '@components/CreateLocationDialog';
import classes from '../style.module.scss';
import { actionDeleteLocationById } from './actions';

const LocationAdminPage = ({ locations, user, token }) => {
  const dispatch = useDispatch();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [currentLocationId, setCurrentLocationId] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [currentEditingLocation, setCurrentEditingLocation] = useState(null);

  useEffect(() => {
    dispatch(actionGetAllLocation());
  }, [dispatch]);


  const handleEdit = (location) => {
    setCurrentEditingLocation(location);
    setIsEditDialogOpen(true);
  };

  const handleCreate = () => {
    setIsCreateDialogOpen(true);
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
    console.log(currentLocationId);
    dispatch(actionDeleteLocationById(currentLocationId, token));
    handleCloseConfirmDialog();
  };

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
          <div>Halaman All Locations</div>
          <button type="button" onClick={() => handleCreate()}>
            Tambah Lokasi
          </button>
          <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell align="left">Nama Provinsi</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {locations.map((location, index) => (
                  <TableRow key={location.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{location.namaProvinsi}</TableCell>
                    <TableCell align="center">
                      <Button color="primary" onClick={() => handleEdit(location)}>
                        Edit
                      </Button>
                      <Button color="secondary" onClick={() => handleDelete(location.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Dialog
            open={openConfirmDialog}
            onClose={handleCloseConfirmDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              <FormattedMessage id="app_confirmation_delete_dialog" />
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                <FormattedMessage id="app_delete_dialog_header" />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseConfirmDialog}>
                <FormattedMessage id="app_cancel_dialog" />
              </Button>
              <Button onClick={handleConfirmDelete} autoFocus>
                <FormattedMessage id="app_delete_dialog" />
              </Button>
            </DialogActions>
          </Dialog>
          <EditDataDialog
            open={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            currentLocation={currentEditingLocation}
          />
          <CreateLocationDialog open={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)} />
        </div>
      </div>
    </div>
  );
};

LocationAdminPage.propTypes = {
  locations: PropTypes.array.isRequired,
  token: PropTypes.string,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locations: selectAllLocation,
  token: selectToken,
  user: selectUser,
});

export default injectIntl(connect(mapStateToProps)(LocationAdminPage));