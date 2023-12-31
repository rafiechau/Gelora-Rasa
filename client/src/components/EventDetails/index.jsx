import PropTypes from 'prop-types';
import PlaceIcon from '@mui/icons-material/Place';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import { FormattedMessage } from 'react-intl';

import { useEffect, useState } from 'react';
import classes from './style.module.scss';

const EventDetail = ({
  event,
  formattedDate,
  handleTicketQuantityChange,
  ticketQuantity,
  selectedTicketType,
  handleTicketTypeChange,
  handleOrder,
  countdown,
  canOrder,
  hasOrdered,
  user,
}) => {
  const [totalPrice, setTotalPrice] = useState('0');

  const calculateTotalPrice = (quantity) => {
    const newTotal = quantity * (event ? event.price : 0);
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(newTotal);
  };

  useEffect(() => {
    if (event && event.price && ticketQuantity) {
      setTotalPrice(calculateTotalPrice(ticketQuantity));
    }
  }, [event, ticketQuantity]);

  const isStandardUser = user?.role === 1;
  const orderButtonDisabled = !canOrder || hasOrdered || !isStandardUser;

  let buttonTextId;
  if (!isStandardUser) {
    buttonTextId = 'event_detail_button_cannot_buy';
  } else if (hasOrdered) {
    buttonTextId = 'event_detail_button_already_bought';
  } else {
    buttonTextId = 'event_detail_button_buy_now';
  }

  return (
    <div className={classes.eventDetail} data-testid="event-detail">
      <div className={classes.containerLocation} data-testid="location-container">
        <div className={classes.containerPlace}>
          <PlaceIcon />
          <span className={classes.location}>{event?.Location?.namaProvinsi}</span>
        </div>
        <div className={classes.containerVenueName}>
          <LocationCityIcon />
          <span className={classes.venueName}>{event?.address}</span>
        </div>
      </div>
      <div className={classes.dateTime} data-testid="date-time-container">
        <div className={classes.containerDateTime}>
          <span className={classes.date}>{formattedDate}</span>
        </div>
        <div className={classes.containerDateTime}>
          <span className={classes.time}>{event?.time}</span>
        </div>
        <div className={classes.containerDateTime}>
          <span className={classes.eventType}>{event?.type}</span>
        </div>
      </div>
      <div className={classes.ticketInfo} data-testid="ticket-info-container">
        <div className={classes.containerTicketInfo}>
          <span className={classes.ticketPrice}>{totalPrice}</span>
          <span className={classes.ticketQuantity}>
            <button type="button" onClick={() => handleTicketQuantityChange(Math.max(1, ticketQuantity - 1))}>
              -
            </button>
            <input type="number" value={ticketQuantity} onChange={(e) => handleTicketQuantityChange(e.target.value)} />
            <button type="button" onClick={() => handleTicketQuantityChange(ticketQuantity + 1)}>
              +
            </button>
          </span>
        </div>
        {event?.type === 'hybrid' && (
          <div className={classes.ticketTypeSelector}>
            <label htmlFor="offline" className={classes.radioLabel}>
              <input
                type="radio"
                name="ticketType"
                value="offline"
                id="offline"
                checked={selectedTicketType === 'offline'}
                onChange={handleTicketTypeChange}
                className={classes.radioInput}
              />
              <FormattedMessage id="app_detail_event_offline" />
            </label>
            <label htmlFor="online" className={classes.radioLabel}>
              <input
                type="radio"
                name="ticketType"
                value="online"
                id="online"
                checked={selectedTicketType === 'online'}
                onChange={handleTicketTypeChange}
                className={classes.radioInput}
              />
              <FormattedMessage id="app_detail_event_online" />
            </label>
          </div>
        )}
        <div className={classes.containerButton}>
          <span>
            <FormattedMessage id="app_detail_event_coutdown_description" />
            {countdown}{' '}
          </span>
          <button type="button" onClick={handleOrder} className={classes.buyNow} disabled={orderButtonDisabled}>
            <FormattedMessage id={buttonTextId} />
          </button>
        </div>
      </div>
    </div>
  );
};

EventDetail.propTypes = {
  event: PropTypes.object.isRequired,
  formattedDate: PropTypes.string.isRequired,
  handleTicketQuantityChange: PropTypes.func.isRequired,
  ticketQuantity: PropTypes.number.isRequired,
  selectedTicketType: PropTypes.string,
  handleTicketTypeChange: PropTypes.func.isRequired,
  handleOrder: PropTypes.func.isRequired,
  countdown: PropTypes.string.isRequired,
  canOrder: PropTypes.bool.isRequired,
  hasOrdered: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

export default EventDetail;
