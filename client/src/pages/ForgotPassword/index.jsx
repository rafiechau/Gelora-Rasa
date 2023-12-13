import { selectLogin } from '@containers/Client/selectors';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import InputTextField from '@components/InputTextField';
import { OurClient } from '@components/OurClient';

import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import classes from './style.module.scss';
import { actionSendForgotPassword } from './actions';

const ForgotPasswordPage = ({ login, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (login) {
      toast.error(formatMessage({ id: 'app_already_login' }));
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    }
  }, [formatMessage, login, navigate]);

  const onSubmit = (data) => {
    dispatch(
      actionSendForgotPassword(data, () => {
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      })
    );
  };

  return (
    <section className={classes.forgotPassword}>
      <div className={classes.forgotPasswordContainer}>
        <div className={classes.forgotPwTxt}>Lupa Password</div>
        <form className={classes.forgotPasswordForm} onSubmit={handleSubmit(onSubmit)}>
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
          <button type="submit" className={classes.forgotPasswordBtn}>
            Login
          </button>
          <div className={classes.formNav}>
            <p className={classes.nav}>
              <FormattedMessage id="app_have_account" />
              <Link to="/login">
                <FormattedMessage id="app_header_login" />
              </Link>
            </p>
          </div>
        </form>
      </div>

      <OurClient />
    </section>
  );
};

ForgotPasswordPage.propTypes = {
  intl: PropTypes.object,
  login: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});

export default injectIntl(connect(mapStateToProps)(ForgotPasswordPage));
