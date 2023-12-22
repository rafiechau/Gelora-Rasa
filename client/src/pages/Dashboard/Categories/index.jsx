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

import { selectAllCategories } from '@pages/Home/selectors';
import { actionGetAllCategories } from '@pages/Home/actions';

import DeleteConfirmationDialog from '@components/DeleteConfirmationDialog';
import CategoryDialog from '@components/CategoryDialog';
import AdminTable from '@components/AdminTable';
import classes from '../style.module.scss';
import { actionDeleteCategoryById } from './actions';

const CategoriesAdminPage = ({ user, categories, token, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  useEffect(() => {
    dispatch(actionGetAllCategories());
  }, [dispatch]);

  const handleOpenCreateDialog = () => {
    setCurrentCategory(null);
    setIsDialogOpen(true);
  };

  const handleOpenEditDialog = (category) => {
    setCurrentCategory(category); // Untuk mode edit, set kategori saat ini
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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

  const filteredCategory = categories.filter((category) => {
    const categorySearchTerm = category?.categoryName?.toLowerCase();
    const matchesSearchTerm = categorySearchTerm.includes(searchTerm.toLowerCase());
    return matchesSearchTerm;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategoryPagination = filteredCategory.slice(indexOfFirstItem, indexOfLastItem);

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

  const categoryColumns = [{ id: 'name', label: 'Nama Kategori' }];

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
          <div>
            <FormattedMessage id="app_header_dashboard_category" />
          </div>
          <div className={classes.searchContainer}>
            <input
              type="text"
              placeholder={formatMessage({ id: 'app_input_search_categories' })}
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <button type="button" onClick={handleOpenCreateDialog}>
            <FormattedMessage id="app_header_create_category" />
          </button>
          <AdminTable
            columns={categoryColumns}
            data={currentCategoryPagination.map((category) => ({ id: category.id, name: category.categoryName }))}
            onEdit={handleOpenEditDialog}
            onDelete={handleDelete}
          />
          <button type="button" onClick={handlePrevious} disabled={currentPage === 1}>
            <FormattedMessage id="app_btn_previous_pagination" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage === Math.ceil(filteredCategory.length / itemsPerPage)}
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
          <CategoryDialog open={isDialogOpen} onClose={handleCloseDialog} currentCategory={currentCategory} />
        </div>
      </div>
    </div>
  );
};

CategoriesAdminPage.propTypes = {
  user: PropTypes.object,
  categories: PropTypes.array.isRequired,
  token: PropTypes.string,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  categories: selectAllCategories,
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(CategoriesAdminPage));
