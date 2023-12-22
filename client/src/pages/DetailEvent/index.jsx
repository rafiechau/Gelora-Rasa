import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import toast from 'react-hot-toast';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import config from '@config/index';
import { selectToken } from '@containers/Client/selectors';
import EventImage from '@components/EventImage';
import EventDetail from '@components/EventDetails';
import EventDescription from '@components/EventDescription';
import classes from './style.module.scss';
import { selectEvent } from './selector';
import { actionUpdateEventStatus, createOrder, getEventById, initialPayment } from './actions';

const DetailEventPage = ({ event, token }) => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [countdown, setCountdown] = useState('');
  const [selectedTicketType, setSelectedTicketType] = useState(event?.type === 'hybrid' ? 'offline' : event?.type);
  const [canOrder, setCanOrder] = useState(true);
  const [hasOrdered, setHasOrdered] = useState(false);

  const handleTicketQuantityChange = (quantity) => {
    setTicketQuantity(quantity);
  };

  const handleTicketTypeChange = (e) => {
    setSelectedTicketType(e.target.value);
  };

  useEffect(() => {
    dispatch(getEventById(eventId, token));
  }, [dispatch, eventId, token]);

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
        if (event.status === 'active') {
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
        dispatch(createOrder(data, token));
      })
    );
    setHasOrdered(true);
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
            formattedPrice={event?.price}
            handleTicketQuantityChange={handleTicketQuantityChange}
            ticketQuantity={ticketQuantity}
            selectedTicketType={selectedTicketType}
            handleTicketTypeChange={handleTicketTypeChange}
            handleOrder={handleOrder}
            countdown={countdown}
            canOrder={canOrder}
            hasOrdered
          />
        </div>
      </div>
      <EventDescription
        description={event?.description}
        organizerFirstName={event?.User?.firstName}
        organizerLastName={event?.User?.lastName}
      />
    </div>
  );
};

DetailEventPage.propTypes = {
  event: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  event: selectEvent,
  token: selectToken,
});

export default injectIntl(connect(mapStateToProps)(DetailEventPage));
