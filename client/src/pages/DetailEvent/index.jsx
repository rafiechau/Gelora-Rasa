import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import toast from 'react-hot-toast';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import config from '@config/index';
import { selectToken, selectUser } from '@containers/Client/selectors';
import EventImage from '@components/EventImage';
import EventDetail from '@components/EventDetails';
import EventDescription from '@components/EventDescription';
import Swal from 'sweetalert2';
import classes from './style.module.scss';
import { selectEvent, selectHasOrdered } from './selector';
import { actionUpdateEventStatus, checkUserOrder, createOrder, getEventById, initialPayment } from './actions';

const DetailEventPage = ({ event, hasOrdered, token, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [countdown, setCountdown] = useState('');
  const [selectedTicketType, setSelectedTicketType] = useState(event?.type === 'hybrid' ? 'offline' : event?.type);
  const [canOrder, setCanOrder] = useState(true);

  console.log(user?.role, 'test');

  const handleTicketQuantityChange = (quantity) => {
    setTicketQuantity(quantity);
  };

  const handleTicketTypeChange = (e) => {
    setSelectedTicketType(e.target.value);
  };

  useEffect(() => {
    dispatch(getEventById(eventId, token));
    dispatch(checkUserOrder(eventId, token));
  }, [dispatch, eventId, token]);

  useEffect(() => {
    if (event?.type) {
      setSelectedTicketType(event.type === 'hybrid' ? 'offline' : event.type);
    }
  }, [event]);

  useEffect(() => {
    if (!event) {
      return;
    }
    const calculateCountdown = () => {
      const now = new Date();
      const deadline = new Date(event?.registrationDealine);
      const timeLeft = deadline - now;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

        setCountdown(`${days} hari ${hours} jam ${minutes} menit`);
      } else {
        if (event?.stok === 0 && event.status === 'active') {
          dispatch(actionUpdateEventStatus(eventId, { status: 'non-active' }, token));
          setCanOrder(false);
        }
        setCountdown('Waktu pendaftaran telah berakhir');
      }
    };

    calculateCountdown();

    const countdownInterval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(countdownInterval);
  }, [event, dispatch, eventId, token]);

  const handleOrder = () => {
    if (!selectedTicketType || selectedTicketType === '') {
      toast.error('Please select a ticket type before ordering.');
      return;
    }
    let ticketTypes = event?.type;
    if (event?.type === 'hybrid') {
      ticketTypes = selectedTicketType;
    }

    dispatch(
      initialPayment({ totalTickets: ticketQuantity, ticketsTypes: ticketTypes }, eventId, token, (data) => {
        dispatch(
          createOrder(data, token, async () => {
            await Swal.fire({
              title: 'Success!',
              text: 'Your order has been placed successfully.',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            navigate('/dashboard/my-orders');
          })
        );
      })
    );
  };

  const isValidDate = event && Date.parse(event.date);
  const formattedDate = isValidDate
    ? new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(event?.date))
    : '';

  const imageUrl =
    event && event?.image
      ? `${config.api.server}${event?.image.replace('\\', '/')}`
      : 'https://source.unsplash.com/random';

  return (
    <div className={classes.containerDetail}>
      <div className={classes.detail}>
        <EventImage imageUrl={imageUrl} altText={event?.eventName || 'Default Event Name'} />
        <div className={classes.eventContent}>
          <div className={classes.title}>{event?.eventName}</div>
          <div className={classes.organizer}>{`${event?.User?.firstName} ${event?.User?.lastName}`}</div>
          <div className={classes.line} />
          <EventDetail
            event={event}
            formattedDate={formattedDate}
            handleTicketQuantityChange={handleTicketQuantityChange}
            ticketQuantity={ticketQuantity}
            selectedTicketType={selectedTicketType}
            handleTicketTypeChange={handleTicketTypeChange}
            handleOrder={handleOrder}
            countdown={countdown}
            canOrder={canOrder}
            hasOrdered={hasOrdered}
            user={user}
          />
        </div>
      </div>
      <EventDescription description={event?.description} />
    </div>
  );
};

DetailEventPage.propTypes = {
  event: PropTypes.object,
  hasOrdered: PropTypes.bool,
  token: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  event: selectEvent,
  hasOrdered: selectHasOrdered,
  token: selectToken,
  user: selectUser,
});

export default injectIntl(connect(mapStateToProps)(DetailEventPage));
