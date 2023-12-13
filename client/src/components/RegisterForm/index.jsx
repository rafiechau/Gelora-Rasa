import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import InputTextField from '@components/InputTextField';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { actionHandleRegister, actionHandleResetRegister, actionSetStep } from '@containers/Client/actions';
import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { selectEmail, selectIsVerify, selectStep } from '@containers/Client/selectors';

import 'react-quill/dist/quill.snow.css';
import classes from './style.module.scss';

const RegisterForm = ({ email, isVerify, step, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.email = email;
    dispatch(
      actionHandleRegister(data, () => {
        setTimeout(() => {
          dispatch(actionHandleResetRegister());
          navigate('/login');
        }, 1500);
      })
    );
  };

  return (
    <form className={classes.registerForm} onSubmit={handleSubmit(onSubmit)}>
      <InputTextField
        input={{
          name: 'firstName',
          required: formatMessage({ id: 'app_user_firstName_require_message' }),
          type: 'text',
          label: formatMessage({ id: 'app_user_firstName' }),
        }}
        register={register}
        errors={errors}
      />
      <InputTextField
        input={{
          name: 'lastName',
          required: formatMessage({ id: 'app_user_lastName_require_message' }),
          type: 'text',
          label: formatMessage({ id: 'app_user_lastName' }),
        }}
        register={register}
        errors={errors}
      />
      <InputTextField
        input={{
          name: 'password',
          required: formatMessage({ id: 'app_user_password_require_message' }),
          type: showPass ? 'text' : 'password',
          minLength: 8,
          label: formatMessage({ id: 'app_user_password' }),
          messageMin: formatMessage({ id: 'app_user_password_min_length' }),
        }}
        register={register}
        errors={errors}
      />
      <InputTextField
        input={{
          name: 'confirmPassword',
          required: formatMessage({ id: 'app_user_confirmPassword_require_message' }),
          type: showPass ? 'text' : 'password',
          minLength: 8,
          label: formatMessage({ id: 'app_user_confirmPassword' }),
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
      <div className={classes.btnWrap}>
        <button
          type="button"
          className={classes.registerBtn}
          onClick={() => (isVerify ? dispatch(actionSetStep(step - 2)) : dispatch(actionSetStep(step - 1)))}
        >
          Kembali
        </button>
        <button type="submit" className={classes.registerBtn}>
          Submit
        </button>
      </div>
    </form>
  );
};

RegisterForm.propTypes = {
  intl: PropTypes.object,
  email: PropTypes.string,
  step: PropTypes.number,
  isVerify: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  email: selectEmail,
  step: selectStep,
  isVerify: selectIsVerify,
});

export default injectIntl(connect(mapStateToProps)(RegisterForm));
