import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Dialog, DialogContent, Drawer, Fab, IconButton, Pagination, TextField, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@emotion/react';
import { createStructuredSelector } from 'reselect';
import { selectToken } from '@containers/Client/selectors';
import FilterTooltip from '@components/FilterTooltip';
import FilterAccordion from '@components/FilterAccordion';
import CardItem from '@components/CardItem';
import SearchIcon from '@mui/icons-material/Search';
import classes from './style.module.scss';
import {
  selectAllCategories,
  selectAllEvent,
  selectAllLocation,
  selectTotalPages,
  selectcurrentPage,
} from './selectors';
import { actionGetAllCategories, actionGetAllLocation, getPaginatedPosts } from './actions';

const Home = ({ allEvent, token, allLocation, allCategories, totalPages, currentPage, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const [filterOpen, setFilterOpen] = useState(false);
  const theme = useTheme();
  const pageSize = 5;
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getPaginatedPosts(1, pageSize));
    }
  }, [dispatch, token]);

  const handleSearchDialogOpen = () => {
    setSearchDialogOpen(true);
  };

  const handleSearchDialogClose = () => {
    setSearchDialogOpen(false);
  };

  const handlePageChange = (event, page) => {
    dispatch(getPaginatedPosts(page, pageSize));
  };

  useEffect(() => {
    dispatch(actionGetAllLocation());
    dispatch(actionGetAllCategories());
  }, [dispatch]);

  const filterEvents = () => {
    let filtered = allEvent;

    if (selectedCategory && selectedCategory !== '') {
      filtered = filtered.filter((event) => event.Category && event.Category.categoryName === selectedCategory);
    }

    if (selectedLocation && selectedLocation !== '') {
      filtered = filtered.filter((event) => event.Location && event.Location.namaProvinsi === selectedLocation);
    }

    if (searchTerm && searchTerm !== '') {
      filtered = filtered.filter((event) => event.eventName.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredEvents(filtered);
  };
  useEffect(() => {
    filterEvents();
  }, [allEvent, selectedCategory, selectedLocation, searchTerm]);

  const handleFilterOpen = () => {
    setFilterOpen(true);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  return (
    <div className={classes.containerHome}>
      {isMobile ? (
        <>
          <FilterTooltip onClick={handleFilterOpen} />
          <Drawer anchor="bottom" open={filterOpen} onClose={handleFilterClose}>
            <FilterAccordion
              title="Kategori"
              options={allCategories.map((category) => ({
                id: category.id,
                value: category.categoryName,
                label: category.categoryName,
              }))}
              selectedOption={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
            <FilterAccordion
              title="Lokasi"
              options={allLocation.map((location) => ({
                id: location.id,
                value: location.namaProvinsi,
                label: location.namaProvinsi,
              }))}
              selectedOption={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />
          </Drawer>
          <Fab
            sx={{ position: 'fixed', bottom: 40, right: 40, zIndex: '10' }}
            color="primary"
            aria-label="search"
            className={classes.fab}
            onClick={handleSearchDialogOpen}
          >
            <SearchIcon />
          </Fab>
          <Dialog open={searchDialogOpen} onClose={handleSearchDialogClose} fullWidth>
            <DialogContent>
              <IconButton onClick={handleSearchDialogClose}>
                <CloseIcon />
              </IconButton>
              <TextField
                autoFocus
                margin="dense"
                id="search"
                label="Search Events"
                type="text"
                fullWidth
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </DialogContent>
          </Dialog>
          <div className={classes.mainContent}>
            <div className={classes.containerCard}>
              {filteredEvents.map((event) => (
                <CardItem key={event.id} event={event} />
              ))}
            </div>
            <Pagination
              count={totalPages}
              page={currentPage}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
              className={classes.pagination}
            />
          </div>
        </>
      ) : (
        <div className={classes.container}>
          <div className={classes.filterContainer}>
            <FilterAccordion
              title={formatMessage({ id: 'app_navigation_categories' })}
              options={[
                { id: '', value: '', label: 'All' },
                ...allCategories.map((category) => ({
                  id: category.id,
                  value: category.categoryName,
                  label: category.categoryName,
                })),
              ]}
              selectedOption={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            />
            <FilterAccordion
              title={formatMessage({ id: 'app_navigation_location' })}
              options={[
                { id: '', value: '', label: 'All' },
                ...allLocation.map((location) => ({
                  id: location.id,
                  value: location.namaProvinsi,
                  label: location.namaProvinsi,
                })),
              ]}
              selectedOption={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            />
          </div>
          <div className={classes.mainContent}>
            <div className={classes.searchContainer}>
              <input
                type="text"
                placeholder={formatMessage({ id: 'app_input_search_event' })}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={classes.containerCard}>
              {filteredEvents.map((event) => (
                <CardItem key={event.id} event={event} />
              ))}
            </div>
            <Pagination
              count={totalPages}
              page={currentPage}
              variant="outlined"
              shape="rounded"
              onChange={handlePageChange}
              className={classes.pagination}
            />
          </div>
        </div>
      )}
    </div>
  );
};

Home.propTypes = {
  allEvent: PropTypes.array,
  token: PropTypes.string,
  allLocation: PropTypes.array,
  allCategories: PropTypes.array,
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  intl: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  allEvent: selectAllEvent,
  token: selectToken,
  allLocation: selectAllLocation,
  allCategories: selectAllCategories,
  totalPages: selectTotalPages,
  currentPage: selectcurrentPage,
});

export default injectIntl(connect(mapStateToProps)(Home));
