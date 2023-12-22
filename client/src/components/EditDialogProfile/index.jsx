import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import InputTextField from '@components/InputTextField';
import { actionEditProfile, actionResetProfile } from '@pages/Dashboard/Profile/actions';
import { useNavigate } from 'react-router-dom';

import classes from './style.module.scss';

const EditProfileDialog = ({ open, onClose, intl: { formatMessage }, profileUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (profileUser) {
      setValue('firstName', profileUser.firstName);
      setValue('lastName', profileUser.lastName);
    }
  }, [profileUser, setValue]);

  const onSubmit = (data) => {
    if (data.new_password === '') {
      delete data.new_password;
    }
    dispatch(
      actionEditProfile(data, () => {
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      })
    );
    onClose();
  };

  useEffect(
    () => () => {
      if (profileUser) {
        dispatch(actionResetProfile());
      }
    },
    [dispatch, profileUser]
  );

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <FormattedMessage id="app_header_add_event" />
        <IconButton onClick={onClose} style={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseSharpIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
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
              name: 'new_password',
              type: showPass ? 'text' : 'password',
              label: `${formatMessage({ id: 'app_user_password' })} (Optional)`,
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Update Data
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

EditProfileDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  intl: PropTypes.object,
  profileUser: PropTypes.object,
};

export default injectIntl(EditProfileDialog);
