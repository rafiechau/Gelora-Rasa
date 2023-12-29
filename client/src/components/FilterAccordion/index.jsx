import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const FilterAccordion = ({ title, options, selectedOption, onChange }) => (
  <Accordion
    data-testid="filter-accordion"
    sx={{ backgroundColor: '#333', color: 'white', borderRadius: '8px', marginBottom: 2 }}
  >
    <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />} data-testid="accordion-summary">
      <Typography>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <RadioGroup value={selectedOption} onChange={onChange} data-testid="radio-group">
        {options.map((option) => (
          <FormControlLabel
            key={option.id}
            value={option.value}
            control={<Radio />}
            label={option.label}
            style={{ marginRight: '12px' }}
            data-testid={`radio-option-${option.id}`}
          />
        ))}
      </RadioGroup>
    </AccordionDetails>
  </Accordion>
);

FilterAccordion.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedOption: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FilterAccordion;
