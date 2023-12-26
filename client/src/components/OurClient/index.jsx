import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';

export const OurClient = () => (
  <div className={classes.containerLogo} data-testid="our-client">
    <p className={classes.titleContainerLogo}>
      <FormattedMessage id="app_events_description" />
    </p>
    <div className={classes.containerBigCompany}>
      <img src="assets/images/apple-111.svg" alt="semina" />
      <img src="assets/images/Adobe.svg" alt="semina" />
      <img src="assets/images/slack-21.svg" alt="semina" />
      <img src="assets/images/spotify-11.svg" alt="semina" />
      <img src="assets/images/google-2015.svg" alt="semina" />
    </div>
  </div>
);
