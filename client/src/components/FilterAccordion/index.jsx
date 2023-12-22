import React from 'react';
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
  <Accordion sx={{ backgroundColor: '#333', color: 'white', borderRadius: '8px', marginBottom: 2 }}>
    <AccordionSummary expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}>
      <Typography>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <RadioGroup value={selectedOption} onChange={onChange}>
        {options.map((option) => (
          <FormControlLabel key={option.id} value={option.value} control={<Radio />} label={option.label} />
        ))}
      </RadioGroup>
    </AccordionDetails>
  </Accordion>
);

export default FilterAccordion;
