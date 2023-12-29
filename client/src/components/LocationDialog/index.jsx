import InputTextField from '@components/InputTextField';
import { useTheme } from '@emotion/react';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, useMediaQuery } from '@mui/material';
import { actionCreateLocation, actionUpdateLocationById } from '@pages/Dashboard/Locations/actions';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

export const LocationDialog = ({ open, onClose, intl: { formatMessage }, currentLocation }) => {
  const dispatch = useDispatch();
  const isEditMode = !!currentLocation;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currentLocation) {
      setValue('namaProvinsi', currentLocation.name);
    } else {
      reset();
    }
  }, [currentLocation, setValue, reset]);

  const onSubmit = (data) => {
    if (isEditMode) {
      dispatch(actionUpdateLocationById(currentLocation.id, data));
    } else {
      dispatch(actionCreateLocation(data));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" fullScreen={fullScreen} data-testid="location-dialog">
      <DialogTitle>
        <FormattedMessage id={isEditMode ? 'app_header_edit_location' : 'app_header_create_location'} />
        <IconButton onClick={onClose} style={{ position: 'absolute', right: 8, top: 8 }} data-testid="close-button">
          <CloseSharpIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} data-testid="submit-button">
            {isEditMode ? (
              <FormattedMessage id="app_header_edit_location" />
            ) : (
              <FormattedMessage id="app_header_create_location" />
            )}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

LocationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  intl: PropTypes.object,
  currentLocation: PropTypes.object,
};

export default injectIntl(LocationDialog);
