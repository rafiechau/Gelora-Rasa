import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { OurClient } from '@components/OurClient';
import { selectLogin, selectStep } from '@containers/Client/selectors';
import { injectIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import VerifyEmail from '@components/VerifyEmail';
import VerifyOTP from '@components/VerifyOTP';
import RegisterForm from '@components/RegisterForm';
import { useEffect, useState } from 'react';

import classes from './style.module.scss';

const RegisterPage = ({ login, step, intl: { formatMessage } }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (login) {
      toast.error(formatMessage({ id: 'app_already_login' }));
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    }
  }, [formatMessage, login, navigate]);

  const renderStep = () => {
    switch (step) {
      case 0:
        return <VerifyEmail />;
      case 1:
        return <VerifyOTP />;
      case 2:
        return <RegisterForm />;
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <section className={classes.register}>
      <div className={classes.containerRegister}>
        <div className={classes.tabs}>
          <div className={`${classes.tab} ${classes.active}`} onClick={() => handleNavigate('/register')}>
            Register
          </div>
          <div className={`${classes.tab}`} onClick={() => handleNavigate('/login')}>
            Login
          </div>
        </div>
        {renderStep()}
      </div>

      <OurClient />
    </section>
  );
};

RegisterPage.propTypes = {
  intl: PropTypes.object,
  login: PropTypes.bool,
  step: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
  step: selectStep,
});

export default injectIntl(connect(mapStateToProps)(RegisterPage));
