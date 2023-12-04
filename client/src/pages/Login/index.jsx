import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, TextField, Typography } from '@mui/material';
import { OurClient } from '@components/OurClient';
import classes from './style.module.scss';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <section className={classes.login}>
      <div className={classes.containerLogin}>
        <div className={classes.tabs}>
          <div className={`${classes.tab}`}>Register</div>
          <div className={`${classes.tab} ${classes.active}`}>Login</div>
        </div>
        <form className={classes.loginForm}>
          <label htmlFor="email">
            Email *
            <input type="email" id="email" placeholder="Your email" required />
          </label>
          <label htmlFor="password">
            Password *
            <input type="password" id="password" placeholder="Your password" required />
          </label>
          <div className={classes.additionalOptions}>
            <Link to="/forgot-password" className={classes.forgotPassword}>
              Forgot Password
            </Link>
          </div>
          <button type="submit" className={classes.loginBtn}>
            Login
          </button>
        </form>
      </div>

      <OurClient />
    </section>
  );
};

const mapStateToProps = createStructuredSelector({});

LoginPage.propTypes = {};

export default connect(mapStateToProps)(LoginPage);
