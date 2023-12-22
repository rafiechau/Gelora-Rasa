import InputTextField from '@components/InputTextField';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { actionCreateCategories, actionUpdateCategoryById } from '@pages/Dashboard/Categories/actions';
import { useTheme } from '@emotion/react';

export const CategoryDialog = ({ open, onClose, intl: { formatMessage }, currentCategory }) => {
  const dispatch = useDispatch();
  const isEditMode = !!currentCategory;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEditMode && currentCategory) {
      setValue('categoryName', currentCategory.name);
    }
  }, [currentCategory, setValue, isEditMode]);

  const onSubmit = (data) => {
    if (isEditMode) {
      dispatch(actionUpdateCategoryById(currentCategory.id, data));
    } else {
      dispatch(actionCreateCategories(data));
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" fullScreen={fullScreen} data-testid="category-dialog">
      <DialogTitle>
        <FormattedMessage id={isEditMode ? 'app_header_edit_category' : 'app_header_create_category'} />
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
              name: 'categoryName',
              required: formatMessage({ id: 'app_category_name_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_category_name' }),
            }}
            register={register}
            errors={errors}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} data-testid="submit-button">
            {isEditMode ? 'app_btn_submit' : 'app_btn_edit'}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

CategoryDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  intl: PropTypes.object,
  currentCategory: PropTypes.object,
};

export default injectIntl(CategoryDialog);
