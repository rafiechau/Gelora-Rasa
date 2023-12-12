import PropTypes from 'prop-types';
import config from '@config/index';
import { selectToken, selectUser } from '@containers/Client/selectors';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoneyIcon from '@mui/icons-material/Money';
import AccessTimeFilledTwoToneIcon from '@mui/icons-material/AccessTimeFilledTwoTone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';

const CardMyEvent = ({ myEvent, token, user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const navigateDetails = () => {
    navigate(`/detail/${myEvent?.id}`);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleDelete = () => {
    handleOpenConfirmDialog();
  };

  const handleConfirmDelete = () => {
    // dispatch(deletePostById(post?.id, token));
    handleCloseConfirmDialog();
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(myEvent.price);

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(myEvent.date));

  return (
    <Card
      sx={{
        bgcolor: '#151422',
        color: 'white',
        my: 2,
        boxShadow: 1,
        borderRadius: 2,
        '&:hover': {
          boxShadow: 6,
        },
      }}
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}
        onClick={navigateDetails}
      >
        <CardContent
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 2,
            padding: 2,
            bgcolor: 'rgba(21, 20, 34, 0.95)',
            borderLeft: '5px solid',
            borderColor: myEvent?.status === 'active' ? 'limegreen' : 'orangered',
          }}
        >
          <Typography variant="h5" sx={{ gridArea: '1 / 1 / 2 / 3', color: 'gold', fontWeight: 'bold' }}>
            {myEvent?.eventName}
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'lightgray', gap: 2 }}>
            <CalendarMonthTwoToneIcon sx={{ color: 'gold' }} />
            {formattedDate}
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'lightgray', gap: 2 }}>
            <AccessTimeFilledTwoToneIcon sx={{ color: 'gold' }} />
            {myEvent?.time}
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'lightgray', gap: 2 }}>
            <LocationCityIcon sx={{ color: 'gold' }} />
            {myEvent?.venueName}
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'lightgray', gap: 2 }}>
            <MoneyIcon sx={{ color: 'gold' }} />
            {formattedPrice}
          </Typography>
        </CardContent>
      </Box>
      <Dialog
        open={openConfirmDialog}
        onClose={handleCloseConfirmDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <FormattedMessage id="app_confirmation_delete_dialog" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <FormattedMessage id="app_delete_dialog_header" />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirmDialog}>
            <FormattedMessage id="app_cancel_dialog" />
          </Button>
          <Button onClick={handleConfirmDelete} autoFocus>
            <FormattedMessage id="app_delete_dialog" />
          </Button>
        </DialogActions>
      </Dialog>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: 'rgba(255, 255, 255, 0.08)' }}>
        <Box sx={{ paddingLeft: 3, display: 'flex', gap: 3 }}>
          <IconButton aria-label="share" sx={{ color: 'yellow', opacity: 0.7, '&:hover': { opacity: 1 } }}>
            <ShareIcon />
          </IconButton>
          <IconButton aria-label="edit" sx={{ color: 'blue', opacity: 0.7, '&:hover': { opacity: 1 } }}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" sx={{ color: 'red', opacity: 0.7, '&:hover': { opacity: 1 } }}>
            <DeleteIcon />
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          sx={{ color: myEvent?.status === 'active' ? 'limegreen' : 'orangered', fontWeight: 'bold', paddingRight: 3 }}
        >
          Status: {myEvent?.status.toUpperCase()}
        </Typography>
      </CardActions>
    </Card>
  );
};

CardMyEvent.propTypes = {
  myEvent: PropTypes.object.isRequired,
  token: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  user: selectUser,
});

export default connect(mapStateToProps)(CardMyEvent);
