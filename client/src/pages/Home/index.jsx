import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Zoom from '@mui/material/Zoom';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
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
import classes from './style.module.scss';

const Home = () => {
  const dispatch = useDispatch();
  const [filterOpen, setFilterOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
            {/* Add more categories as needed */}
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
            {/* Add more price options as needed */}
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
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </div>
    </div>
  );
};

export default Home;
