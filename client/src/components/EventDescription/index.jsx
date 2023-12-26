import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';

const EventDescription = ({ description }) => (
  <div className={classes.eventDescription} data-testid="event-description">
    <div className={classes.description}>
      <h2>
        <FormattedMessage id="app_detail_event_description_txt" />
      </h2>
      <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  </div>
);

EventDescription.propTypes = {
  description: PropTypes.string,
};

export default EventDescription;
