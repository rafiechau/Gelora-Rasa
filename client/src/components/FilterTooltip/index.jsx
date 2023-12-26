import React from 'react';
import PropTypes from 'prop-types';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Tooltip, IconButton, Zoom } from '@mui/material';

const FilterTooltip = ({ onClick }) => (
  <Tooltip title="Filter" arrow TransitionComponent={Zoom}>
    <IconButton
      onClick={onClick}
      data-testid="filter-tooltip-button"
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
);

FilterTooltip.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default FilterTooltip;
