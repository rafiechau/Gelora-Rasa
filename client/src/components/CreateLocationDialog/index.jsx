import InputTextField from '@components/InputTextField';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { actionCreateLocation } from '@pages/Dashboard/Locations/actions';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

export const CreateLocationDialog = ({ open, onClose, intl: { formatMessage } }) => {
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data, 'test');
    dispatch(actionCreateLocation(data));
    onClose();
  };

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
              name: 'namaProvinsi',
              required: formatMessage({ id: 'app_location_name_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_location_name' }),
            }}
            register={register}
            errors={errors}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit Tweet
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

CreateLocationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  intl: PropTypes.object,
};

export default injectIntl(CreateLocationDialog);
