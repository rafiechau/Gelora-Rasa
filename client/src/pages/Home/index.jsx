import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import Zoom from '@mui/material/Zoom';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
  CircularProgress,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CardItem from '@components/CardItem';
import { useTheme } from '@emotion/react';
import { createStructuredSelector } from 'reselect';
import { selectToken } from '@containers/Client/selectors';
import InfiniteScroll from 'react-infinite-scroll-component';
import classes from './style.module.scss';
import { selectAllCategories, selectAllEvent, selectAllLocation } from './selectors';
import { getAllEvent } from './actions';

const Home = ({ allEvent, token, allLocation, allCategories }) => {
  const dispatch = useDispatch();
  const [filterOpen, setFilterOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (token) {
      dispatch(getAllEvent(token, page));
    }
  }, [dispatch, token, page]);

  const fetchMoreData = () => {
    setTimeout(() => {
      if (allEvent.length === 0) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    }, 1500);
  };

  const renderFilterOptions = () => (
    <>
      <Accordion sx={{ backgroundColor: '#333', color: 'white', borderRadius: '8px', marginBottom: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
          <Typography>Kategori</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox name="checkedComedy" />} label="Comedy" />
            <FormControlLabel control={<Checkbox name="checkedMusic" />} label="Music & Entertainment" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: '#333', color: 'white', borderRadius: '8px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
          <Typography>Harga</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel control={<Checkbox name="checkedGratis" />} label="Gratis" />
            <FormControlLabel control={<Checkbox name="checkedPremium" />} label="Premium" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </>
  );

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
          <Tooltip title="Filter" arrow TransitionComponent={Zoom}>
            <IconButton
              onClick={handleFilterOpen}
              sx={{
                color: 'white',
                backgroundColor: '#333',
                borderRadius: '1px',
                '&:hover': {
                  backgroundColor: '#555',
                  boxShadow: '0 2px 10px rgba(255, 255, 255, 0.3)',
                },
                '&:active': {
                  backgroundColor: '#1a1a1a',
                },
              }}
            >
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          <Drawer anchor="bottom" open={filterOpen} onClose={handleFilterClose}>
            {renderFilterOptions()}
          </Drawer>
        </>
      ) : (
        <div className={classes.filterContainer}>{renderFilterOptions()}</div>
      )}

      <div className={classes.containerCard}>
        <InfiniteScroll
          dataLength={allEvent.length}
          next={fetchMoreData}
          hasMore
          loader={
            hasMore ? (
              <CircularProgress
                sx={{ position: 'fixed', left: '50%', bottom: '50px', transform: 'translateX(-50%)', zIndex: 1000 }}
                color="secondary"
              />
            ) : null
          }
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>You have seen it all</b>
            </p>
          }
          className={classes.containerCard}
        >
          {allEvent.map((event) => (
            <CardItem key={event.id} event={event} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

Home.propTypes = {
  allEvent: PropTypes.array,
  token: PropTypes.string,
  allLocation: PropTypes.array,
  allCategories: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  allEvent: selectAllEvent,
  token: selectToken,
  allLocation: selectAllLocation,
  allCategories: selectAllCategories,
});

export default injectIntl(connect(mapStateToProps)(Home));
