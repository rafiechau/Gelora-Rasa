import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import classes from './style.module.scss';

const EventSelectionForm = ({
  selectedEventId,
  allMyEvents,
  inputMeetingId,
  handleEventChange,
  handleMeetingIdChange,
  handleSubmit,
}) => (
  <form onSubmit={handleSubmit} className={classes.form}>
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Your Active Event</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedEventId}
        label="Your event"
        onChange={handleEventChange}
      >
        {allMyEvents.map((event) => (
          <MenuItem key={event.id} value={event.id}>
            {event.eventName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <input
      className={classes.inputMeetingId}
      placeholder="Send meeting id to user"
      value={inputMeetingId}
      onChange={handleMeetingIdChange}
    />
    <button className={classes.btnSendToUser} type="submit">
      Send to Customer
    </button>
  </form>
);

EventSelectionForm.propTypes = {
  selectedEventId: PropTypes.string.isRequired,
  allMyEvents: PropTypes.array.isRequired,
  inputMeetingId: PropTypes.string.isRequired,
  handleEventChange: PropTypes.func.isRequired,
  handleMeetingIdChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default EventSelectionForm;
