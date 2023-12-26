/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { injectIntl, FormattedMessage } from 'react-intl';
import classes from './style.module.scss';

const EventSelectionForm = ({
  selectedEventId,
  allMyEvents,
  inputMeetingId,
  handleEventChange,
  handleMeetingIdChange,
  handleSubmit,
  intl: { formatMessage },
}) => (
  <form onSubmit={handleSubmit} className={classes.form} data-testid="event-selection-form">
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Your Active Event</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedEventId}
        label={formatMessage({ id: 'app_your_event_placeholder' })}
        onChange={handleEventChange}
        data-testid="event-select"
      >
        {allMyEvents.map((event) => (
          <MenuItem key={event.id} value={event.id} data-testid={`event-option-${event.id}`}>
            {event.eventName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <input
      className={classes.inputMeetingId}
      placeholder={formatMessage({ id: 'app_streaming_send_meeting_id_to_customer' })}
      value={inputMeetingId}
      onChange={handleMeetingIdChange}
      data-testid="meeting-id-input"
    />
    <button className={classes.btnSendToUser} type="submit" data-testid="submit-button">
      <FormattedMessage id="app_streaming_send_to_customer" />
    </button>
  </form>
);

EventSelectionForm.propTypes = {
  allMyEvents: PropTypes.array.isRequired,
  inputMeetingId: PropTypes.string.isRequired,
  handleEventChange: PropTypes.func.isRequired,
  handleMeetingIdChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  intl: PropTypes.object,
};

export default injectIntl(EventSelectionForm);
