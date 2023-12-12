import InputTextField from '@components/InputTextField';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { actionUpdateLocationById } from '@pages/Dashboard/Locations/actions';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

export const EditDataDialog = ({ open, onClose, intl: { formatMessage }, currentLocation }) => {
  const dispatch = useDispatch();

  console.log(currentLocation?.id);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currentLocation) {
      setValue('namaProvinsi', currentLocation.namaProvinsi);
    }
  }, [currentLocation, setValue]);

  const onSubmit = (data) => {
    dispatch(actionUpdateLocationById(currentLocation.id, data));
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

EditDataDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  intl: PropTypes.object,
  currentLocation: PropTypes.object,
};

export default injectIntl(EditDataDialog);
