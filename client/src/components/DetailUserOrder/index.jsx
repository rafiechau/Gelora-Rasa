/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import config from '@config/index';
import { useState } from 'react';

import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import classes from './style.module.scss';

const DetailUserOrder = ({ open, onClose, user }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullScreen={fullScreen} data-testid="user-details-dialog">
      <DialogTitle className={classes.dialogTitle} data-testid="dialog-title">
        <FormattedMessage id="app_title_user_details" />
      </DialogTitle>

      <DialogContent className={classes.dialogContent}>
        {user.length > 0 ? (
          user.map((data, index) => (
            <DialogContentText className={classes.dialogText}>
              <FormattedMessage
                id="app_user_ticket_info"
                values={{
                  number: index + 1,
                  name: data?.user?.firstName,
                  ticketCount: data?.totalTickets,
                }}
              />
            </DialogContentText>
          ))
        ) : (
          <Typography>
            <FormattedMessage id="app_no_data_available" />
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} data-testid="close-button">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DetailUserOrder.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default DetailUserOrder;
