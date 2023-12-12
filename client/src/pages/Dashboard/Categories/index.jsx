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

import { selectAllCategories } from '@pages/Home/selectors';
import { actionGetAllCategories } from '@pages/Home/actions';

import EditCategoryDialog from '@components/EditCategoryDialog';
import CreateCategoryDialog from '@components/CreateCategoryDialog';
import classes from '../style.module.scss';
import { actionDeleteCategoryById } from './actions';

const CategoriesAdminPage = ({ user, categories, token }) => {
  const dispatch = useDispatch();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [currentEditingCategory, setCurrentEditingCategory] = useState(null);

  useEffect(() => {
    dispatch(actionGetAllCategories());
  }, [dispatch]);

  const handleEdit = (category) => {
    setCurrentEditingCategory(category);
    setIsEditDialogOpen(true);
  };

  const handleCreate = () => {
    setIsCreateDialogOpen(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    setCurrentCategoryId(null);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleDelete = (categoryId) => {
    setCurrentCategoryId(categoryId);
    handleOpenConfirmDialog();
  };

  const handleConfirmDelete = () => {
    dispatch(actionDeleteCategoryById(currentCategoryId, token));
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
          <div>Halaman All Categories</div>
          <button type="button" onClick={() => handleCreate()}>
            Tambah Categories
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
                {categories.map((category, index) => (
                  <TableRow key={category.id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="left">{category.categoryName}</TableCell>
                    <TableCell align="center">
                      <Button color="primary" onClick={() => handleEdit(category)}>
                        Edit
                      </Button>
                      <Button color="secondary" onClick={() => handleDelete(category.id)}>
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
          <EditCategoryDialog
            open={isEditDialogOpen}
            onClose={() => setIsEditDialogOpen(false)}
            currentCategory={currentEditingCategory}
          />
          <CreateCategoryDialog open={isCreateDialogOpen} onClose={() => setIsCreateDialogOpen(false)} />
        </div>
      </div>
    </div>
  );
};

CategoriesAdminPage.propTypes = {
  user: PropTypes.object,
  categories: PropTypes.array.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  categories: selectAllCategories,
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(CategoriesAdminPage));
