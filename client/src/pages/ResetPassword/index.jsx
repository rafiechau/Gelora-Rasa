import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectLogin } from '@containers/Client/selectors';
import classes from './style.module.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { actionResetPassword } from './actions';
import InputTextField from '@components/InputTextField';
import { OurClient } from '@components/OurClient';

const ResetPasswordPage = ({ login, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const [showPass, setShowPass] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (login) {
      toast.error(formatMessage({ id: 'app_already_login' }));
      setTimeout(() => {
        navigate('/');
      }, 1500);
    }
  }, [formatMessage, login, navigate]);

  useEffect(() => {
    if (!token) {
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    }
  }, [navigate, token]);

  const onSubmit = (data) => {
    data.token = token;
    dispatch(
      actionResetPassword(data, () => {
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      })
    );
  };
  return (
    <section className={classes.resetPassword}>
      <div className={classes.resetPasswordContainer}>
        <div className={classes.resetPwTxt}>Reset Password</div>
        <form className={classes.resetPasswordForm} onSubmit={handleSubmit(onSubmit)}>
          <InputTextField
            input={{
              name: 'new_password',
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
          <button type="submit" className={classes.resetPasswordBtn}>
            Reset Password
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

ResetPasswordPage.propTypes = {
  intl: PropTypes.object,
  login: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});

export default injectIntl(connect(mapStateToProps)(ResetPasswordPage));
