import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { OurClient } from '@components/OurClient';
import { TextField } from '@mui/material';
import classes from './style.module.scss';

const RegisterPage = () => {
  const dispatch = useDispatch();

  return (
    <section className={classes.register}>
      <div className={classes.containerRegister}>
        <div className={classes.tabs}>
          <div className={`${classes.tab} ${classes.active}`}>Register</div>
          <div className={`${classes.tab}`}>Login</div>
        </div>
        <form className={classes.registerForm}>
          <label htmlFor="email">
            Email *
            <input type="email" id="email" placeholder="Your email" required />
          </label>

          <label htmlFor="firstName">
            First Name *
            <input type="text" id="firstName" placeholder="Your first name" required />
          </label>

          <label htmlFor="lastName">
            Last Name *
            <input type="text" id="lastName" placeholder="Your last name" required />
          </label>

          <label htmlFor="phone">
            Phone Number *
            <input type="tel" id="phone" placeholder="Your phone number" required />
          </label>

          <label htmlFor="password">
            Password *
            <input type="password" id="password" placeholder="Your password" required />
          </label>

          <label htmlFor="confirmPassword">
            Confirm Password *
            <input type="password" id="confirmPassword" placeholder="Confirm your password" required />
          </label>
          <button type="submit" className={classes.registerBtn}>
            Register
          </button>
        </form>
      </div>

      <OurClient />
    </section>
  );
};

const mapStateToProps = createStructuredSelector({});

RegisterPage.propTypes = {};

export default connect(mapStateToProps)(RegisterPage);
