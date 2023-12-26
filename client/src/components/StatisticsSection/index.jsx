// StatisticsSection.jsx
import React from 'react';
import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';

const StatisticsSection = () => (
  <div className={classes.statistics} data-testid="statistics-section">
    <div className={classes.statistic}>
      <span className={classes.statNumber}>150+</span>
      <span className={classes.statLabel}>
        <FormattedMessage id="app_events_attended" />
      </span>
    </div>
    <div className={classes.statistic}>
      <span className={classes.statNumber}>3000+</span>
      <span className={classes.statLabel}>
        <FormattedMessage id="app_events_tickets_sold" />
      </span>
    </div>
  </div>
);

export default StatisticsSection;
