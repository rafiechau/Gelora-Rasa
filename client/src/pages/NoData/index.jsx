import { FormattedMessage } from 'react-intl';

// import logo from '@static/images/not-found.png';

import NoData from '@static/images/n-data.jpg';

import classes from './style.module.scss';

const NotData = () => (
  <div className={classes.contentWrapper}>
    <img className={classes.image} src={NoData} alt="Not Data" />
    <div className={classes.title}>
      <FormattedMessage id="app_not_found" />
    </div>
  </div>
);

export default NotData;
