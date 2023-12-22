import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

const DeleteConfirmationDialog = ({ open, onConfirm, onCancel, dialogTitle, dialogContent }) => (
  <Dialog
    open={open}
    onClose={onCancel}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">{dialogContent}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel}>
        <FormattedMessage id="app_cancel_dialog" />
      </Button>
      <Button onClick={onConfirm} autoFocus>
        <FormattedMessage id="app_delete_dialog" />
      </Button>
    </DialogActions>
  </Dialog>
);

DeleteConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  dialogTitle: PropTypes.node.isRequired,
  dialogContent: PropTypes.node.isRequired,
};

export default DeleteConfirmationDialog;
