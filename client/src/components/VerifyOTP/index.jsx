import { actionHandleSendEmailVerify, actionHandleSendOTP, actionSetStep } from '@containers/Client/actions';
import { selectEmail, selectExpire, selectStep, selectTokenEmail } from '@containers/Client/selectors';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import InputTextField from '@components/InputTextField';
import { FormattedMessage, injectIntl } from 'react-intl';
import Countdown from 'react-countdown';
import classes from './style.module.scss';

const VerifyOTP = ({ tokenVerify, isExpire, email, step, intl: { formatMessage } }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.token = tokenVerify;
    dispatch(actionHandleSendOTP(data));
  };

  return (
    <form className={classes.registerForm} onSubmit={handleSubmit(onSubmit)}>
      <InputTextField
        input={{
          name: 'otp',
          required: formatMessage({ id: 'app_user_otp_require_message' }),
          type: 'number',
          label: formatMessage({ id: 'app_user_otp' }),
          minLength: 4,
          messageMin: formatMessage({ id: 'app_user_otp' }),
        }}
        register={register}
        errors={errors}
      />
      <div className={classes.timerComp}>
        <FormattedMessage id="app_resend" /> ?
        <Countdown date={isExpire}>
          <button
            type="button"
            onClick={() => {
              dispatch(actionHandleSendEmailVerify({ email }));
              dispatch(actionSetStep(1));
            }}
            className={classes.buttonResend}
          >
            <FormattedMessage id="app_resend" />
          </button>
        </Countdown>
      </div>
      <div className={classes.btnWrap}>
        <button type="button" className={classes.otpBtn} onClick={() => dispatch(actionSetStep(step - 1))}>
          Kembali
        </button>
        <button type="submit" className={classes.otpBtn}>
          Lanjut
        </button>
      </div>
    </form>
  );
};

VerifyOTP.propTypes = {
  intl: PropTypes.object,
  step: PropTypes.number,
  tokenVerify: PropTypes.string,
  email: PropTypes.string,
  isExpire: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  tokenVerify: selectTokenEmail,
  step: selectStep,
  email: selectEmail,
  isExpire: selectExpire,
});

export default injectIntl(connect(mapStateToProps)(VerifyOTP));
