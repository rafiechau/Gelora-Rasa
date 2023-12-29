import PropTypes from 'prop-types';
import { selectToken, selectUser } from '@containers/Client/selectors';
import { Box, Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoneyIcon from '@mui/icons-material/Money';
import AccessTimeFilledTwoToneIcon from '@mui/icons-material/AccessTimeFilledTwoTone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import CalendarMonthTwoToneIcon from '@mui/icons-material/CalendarMonthTwoTone';
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import toast from 'react-hot-toast';
import { actionDeleteMyEventById, actionGetAllEventOrder } from '@pages/Dashboard/MyEvents/actions';
import DeleteConfirmationDialog from '@components/DeleteConfirmationDialog';
import EventDialog from '@components/EventDialog';
import UserDetailsDialog from '@components/UserDetailsDialog';
import { selectAllMyOrderEvents } from '@pages/Dashboard/MyEvents/selectors';
import DetailUserOrder from '@components/DetailUserOrder';

const CardMyEvent = ({ myEvent, token, orderUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openEventOrganizerDialog, setOpenEventOrganizerDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  console.log(orderUser, "<<aaa")

  const handleCloseEventOrganizerDialog = () => {
    setOpenEventOrganizerDialog(false);
    setSelectedOrder(null);
  };

  const navigateDetails = () => {
    navigate(`/detail/${myEvent?.id}`);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleDelete = () => {
    handleOpenConfirmDialog();
  };

  const handleOpenEventOrganizerDialog = () => {
    setSelectedOrder(orderUser);
    setOpenEventOrganizerDialog(true);
  };

  const handleViewDetails = (eventId) => {
    dispatch(actionGetAllEventOrder(eventId, token));
    handleOpenEventOrganizerDialog();
  };

  const handleConfirmDelete = () => {
    dispatch(actionDeleteMyEventById(myEvent?.id, token));
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

  const handleShareClick = async () => {
    const url = `${window.location.origin}/detail/${myEvent.id}`;
    const text = `Check out this event: ${myEvent.eventName}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: myEvent.eventName,
          text,
          url,
        });
        toast.success('Event shared successfully!');
      } else {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      toast.error('Failed to share event.');
    }
  };

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
      data-testid="card-my-event"
    >
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}
        onClick={navigateDetails}
        data-testid="card-action-area"
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
          <Typography variant="h5" sx={{ gridArea: '1 / 1 / 2 / 3', color: 'teal', fontWeight: 'bold' }}>
            {myEvent?.eventName}
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'lightgray', gap: 2 }}>
            <CalendarMonthTwoToneIcon sx={{ color: 'teal' }} />
            {formattedDate}
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'lightgray', gap: 2 }}>
            <AccessTimeFilledTwoToneIcon sx={{ color: 'teal' }} />
            {myEvent?.time}
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'lightgray', gap: 2 }}>
            <LocationCityIcon sx={{ color: 'teal' }} />
            {myEvent?.venueName}
          </Typography>
          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', color: 'lightgray', gap: 2 }}>
            <MoneyIcon sx={{ color: 'teal' }} />
            {formattedPrice}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: 'rgba(255, 255, 255, 0.08)' }}>
        <Box sx={{ paddingLeft: 3, display: 'flex', gap: 3 }}>
          <IconButton
            aria-label="share"
            sx={{ color: 'yellow', opacity: 0.7, '&:hover': { opacity: 1 } }}
            onClick={handleShareClick}
            data-testid="share-button"
          >
            <ShareIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            sx={{ color: 'blue', opacity: 0.7, '&:hover': { opacity: 1 } }}
            onClick={handleOpenDialog}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            sx={{ color: 'red', opacity: 0.7, '&:hover': { opacity: 1 } }}
            onClick={handleDelete}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            sx={{ color: 'red', opacity: 0.7, '&:hover': { opacity: 1 } }}
            onClick={(eventId) => handleViewDetails(myEvent?.id)}
          >
            Lihat Detail
          </IconButton>
        </Box>
        <Typography
          variant="body2"
          sx={{ color: myEvent?.status === 'active' ? 'limegreen' : 'orangered', fontWeight: 'bold', paddingRight: 3 }}
        >
          <FormattedMessage id="app_status_events" />: {myEvent?.status.toUpperCase()}
        </Typography>
      </CardActions>
      <DetailUserOrder open={openEventOrganizerDialog} onClose={handleCloseEventOrganizerDialog} user={orderUser} />
      <DeleteConfirmationDialog
        open={openConfirmDialog}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseConfirmDialog}
        dialogTitle={<FormattedMessage id="app_confirmation_delete_dialog" />}
        dialogContent={<FormattedMessage id="app_delete_dialog_header" />}
      />
      {isDialogOpen && <EventDialog open={isDialogOpen} onClose={handleCloseDialog} mode="edit" myEvent={myEvent} />}
    </Card>
  );
};

CardMyEvent.propTypes = {
  myEvent: PropTypes.object.isRequired,
  token: PropTypes.string,
  orderUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
  orderUser: selectAllMyOrderEvents,
});

export default connect(mapStateToProps)(CardMyEvent);
