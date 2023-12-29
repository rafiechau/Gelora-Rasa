import { selectEmail, selectIsVerify, selectStep } from '@containers/Client/selectors';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { actionHandleSendEmailVerify, actionSetStep } from '@containers/Client/actions';
import InputTextField from '@components/InputTextField';
import classes from './style.module.scss';

const VerifyEmail = ({ email, step, isVerify, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (!email || data.email !== email) {
      dispatch(actionHandleSendEmailVerify(data));
    } else if (isVerify) {
      dispatch(actionSetStep(step + 2));
    } else {
      dispatch(actionSetStep(step + 1));
    }
  };

  return (
    <form className={classes.registerForm} onSubmit={handleSubmit(onSubmit)}>
      <InputTextField
        input={{
          name: 'email',
          placeholder: 'Your Email',
          required: formatMessage({ id: 'app_user_email_require_message' }),
          type: 'text',
          label: formatMessage({ id: 'app_user_email' }),
          pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
          messagePatern: formatMessage({ id: 'app_user_email_pattern_message' }),
          value: email,
        }}
        register={register}
        errors={errors}
      />
      <button type="submit" className={classes.registerBtn}>
        <FormattedMessage id="app_btn_next_pagination" />
      </button>
    </form>
  );
};

VerifyEmail.propTypes = {
  intl: PropTypes.object,
  step: PropTypes.number,
  email: PropTypes.string,
  isVerify: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  step: selectStep,
  email: selectEmail,
  isVerify: selectIsVerify,
});

export default injectIntl(connect(mapStateToProps)(VerifyEmail));
