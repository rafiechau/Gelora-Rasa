import { Dialog, DialogTitle, DialogContent, DialogActions, Button, DialogContentText } from '@mui/material';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';

const OrderDetailsDialog = ({ open, onClose, order }) => {
  const isValidDate = order && Date.parse(order?.tanggalPembelian);
  const formattedDate = isValidDate
    ? new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(order?.tanggalPembelian))
    : '';
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" data-testid="order-details-dialog">
      <DialogTitle className={classes.dialogTitle} data-testid="order-details-title">
        <FormattedMessage id="app_title_order_details" />
      </DialogTitle>
      <DialogContent className={classes.dialogContent} data-testid="order-details-content">
        <DialogContentText className={classes.dialogText}>
          <FormattedMessage id="app_order_name_events" />: {order?.eventName}
        </DialogContentText>
        <DialogContentText className={classes.dialogText}>
          <FormattedMessage id="app_order_total_tickets" />: {order?.totalTickets}
        </DialogContentText>
        <DialogContentText className={classes.dialogText}>
          <FormattedMessage id="app_order_total_pay" />: {order?.totalPay}
        </DialogContentText>
        <DialogContentText className={classes.dialogText}>
          <FormattedMessage id="app_order_status_order" />: {order?.status}
        </DialogContentText>
        <DialogContentText className={classes.dialogText}>
          <FormattedMessage id="app_order_date_order" />: {formattedDate}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} data-testid="order-details-close-button">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

OrderDetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  order: PropTypes.object, // Anda mungkin perlu mendefinisikan shape untuk 'order'
};

export default OrderDetailsDialog;
