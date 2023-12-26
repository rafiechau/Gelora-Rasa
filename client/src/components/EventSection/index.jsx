// TopEventsSection.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';

const TopEventsSection = ({ events, onNavigate }) => (
  <div className={classes.topEventsSection} data-testid="top-events-section">
    <div className={classes.topEventsHeader}>
      <div className={classes.topEventsTitle} data-testid="top-events-title">
        <FormattedMessage id="app_top_events_title" />
      </div>
      <button
        type="button"
        className={classes.browseAllButton}
        onClick={() => onNavigate('/login')}
        data-testid="browse-all-button"
      >
        <FormattedMessage id="app_home_before_login_browse_button" />
      </button>
    </div>

    <div className={classes.cardsContainer} data-testid="cards-container">
      {events.map((event, index) => (
        <div key={index} className={classes.eventCard} data-testid={`event-card-${index}`}>
          <img src={event.image} alt={event.title} className={classes.cardImage} />
          <div className={classes.eventTitle}>{event.title}</div>
          <div className={classes.eventCategory}>{event.category}</div>
          <div className={classes.eventDate}>{event.date}</div>
        </div>
      ))}
    </div>
  </div>
);

TopEventsSection.propTypes = {
  events: PropTypes.array.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default TopEventsSection;
