import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';

const EventDescription = ({ description, organizerFirstName, organizerLastName }) => (
  <div className={classes.eventDescription}>
    <div className={classes.description}>
      <h2>
        <FormattedMessage id="app_detail_event_description_txt" />
      </h2>
      <p>{description}</p>
    </div>
    <div className={classes.line} />
    <div className={classes.creatorInfo}>
      <div className={classes.containerCreator}>
        <span>
          <FormattedMessage id="app_detail_event_about_profile_txt" />
        </span>
        <button type="button">
          <FormattedMessage id="app_detail_event_button_see_profil" />
        </button>
      </div>
      <div className={classes.containerProfil}>
        <img src="/assets/images/example.jpeg" alt="Porsche Club ID Logo" />
        <div className={classes.creatorText}>
          <h3>{`${organizerFirstName} ${organizerLastName}`}</h3>
        </div>
      </div>
    </div>
    <div className={classes.line} />
  </div>
);

EventDescription.propTypes = {
  description: PropTypes.string,
  organizerFirstName: PropTypes.string,
  organizerLastName: PropTypes.string,
};

export default EventDescription;
