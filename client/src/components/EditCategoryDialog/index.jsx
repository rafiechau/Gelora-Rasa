import InputTextField from '@components/InputTextField';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { actionUpdateCategoryById } from '@pages/Dashboard/Categories/actions';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

export const EditCategoryDialog = ({ open, onClose, intl: { formatMessage }, currentCategory }) => {
  const dispatch = useDispatch();

console.log(currentCategory)

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (currentCategory) {
      setValue('categoryName', currentCategory.categoryName);
    }
  }, [currentCategory, setValue]);

  const onSubmit = (data) => {
    console.log(data, "ini halaman berapasih")
    dispatch(actionUpdateCategoryById(currentCategory.id, data));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <FormattedMessage id="app_header_edit_category" />
        <IconButton onClick={onClose} style={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseSharpIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <InputTextField
            input={{
              name: 'categoryName',
              required: formatMessage({ id: 'app_category_name_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_category_name' }),
            }}
            register={register}
            errors={errors}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit Category
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

EditCategoryDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  intl: PropTypes.object,
  currentCategory: PropTypes.object,
};

export default injectIntl(EditCategoryDialog);
