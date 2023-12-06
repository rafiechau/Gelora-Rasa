import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OurClient } from '@components/OurClient';
import InputTextField from '@components/InputTextField';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { actionHandleLogin } from '@containers/Client/actions';
import { selectLogin } from '@containers/Client/selectors';
import classes from './style.module.scss';

const LoginPage = ({ login, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [isAfterLogin, setIsAfterLogin] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (login && !isAfterLogin) {
      toast.error(formatMessage({ id: 'app_already_login' }));
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    }
  }, [formatMessage, isAfterLogin, login, navigate]);

  const onSubmit = (data) => {
    setIsAfterLogin(true);
    dispatch(
      actionHandleLogin(data, () => {
        setTimeout(() => {
          navigate('/home');
        }, 1500);
      })
    );
  };

  return (
    <section className={classes.login}>
      <div className={classes.containerLogin}>
        <div className={classes.tabs}>
          <div className={`${classes.tab}`}>Register</div>
          <div className={`${classes.tab} ${classes.active}`}>Login</div>
        </div>
        <form className={classes.loginForm} onSubmit={handleSubmit(onSubmit)}>
          <InputTextField
            input={{
              name: 'email',
              required: formatMessage({ id: 'app_user_email_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_user_email' }),
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
              messagePatern: formatMessage({ id: 'app_user_email_pattern_message' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'password',
              required: formatMessage({ id: 'app_user_password_require_message' }),
              type: showPass ? 'text' : 'password',
              label: formatMessage({ id: 'app_user_password' }),
              minLength: 8,
              messageMin: formatMessage({ id: 'app_user_password_min_length' }),
            }}
            register={register}
            errors={errors}
          >
            <label htmlFor="show" className={classes.showPassword}>
              <input type="checkbox" name="show" id="show" onChange={(e) => setShowPass(e.target.checked)} />
              <FormattedMessage id="app_user_password_show" />
            </label>
          </InputTextField>
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

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});

LoginPage.propTypes = {
  intl: PropTypes.object,
  login: PropTypes.bool,
};

export default injectIntl(connect(mapStateToProps)(LoginPage));
