import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PlaceIcon from '@mui/icons-material/Place';
import LocationCityIcon from '@mui/icons-material/LocationCity';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import config from '@config/index';
import { selectToken } from '@containers/Client/selectors';
import classes from './style.module.scss';
import { selectEvent } from './selector';
import { createOrder, getEventById, updateOrderStatus } from './actions';

const DetailEventPage = ({ event, token }) => {
  const dispatch = useDispatch();
  const { eventId } = useParams();
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [countdown, setCountdown] = useState('');
  const [selectedTicketType, setSelectedTicketType] = useState(event?.type === 'hybrid' ? 'offline' : event?.type);

  const handleQuantityChange = (event) => {
    setTicketQuantity(event.target.value);
  };

  useEffect(() => {
    dispatch(getEventById(eventId));
  }, [dispatch, eventId]);

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const deadline = new Date(event.registrationDealine);
      const timeLeft = deadline - now;

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setCountdown(`${days} hari ${hours} jam ${minutes} menit ${seconds} detik`);
      } else {
        setCountdown('Waktu pendaftaran telah berakhir');
      }
    };

    const countdownInterval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(countdownInterval);
  }, [event.registrationDealine]);

  const handleTicketTypeChange = (e) => {
    setSelectedTicketType(e.target.value);
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(event.price);

  const handleOrder = () => {
    let ticketTypes = event?.type;
    if (event?.type === 'hybrid') {
      ticketTypes = selectedTicketType;
    }
    const orderData = {
      eventId,
      totalTickets: ticketQuantity,
      ticketTypes,
    };
    dispatch(
      createOrder(orderData, token, (orderId, status, newToken) => {
        dispatch(updateOrderStatus(orderId, status, newToken));
      })
    );
  };

  const isValidDate = Date.parse(event.date);
  const formattedDate = isValidDate
    ? new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(event.date))
    : '';

  const imageUrl =
    event && event?.image
      ? `${config.api.server}${event?.image.replace('\\', '/')}`
      : 'https://source.unsplash.com/random';

  return (
    <div className={classes.containerDetail}>
      <div className={classes.detail}>
        <div className={classes.eventImage}>
          <img src={imageUrl} alt={event.eventName} />
        </div>
        <div className={classes.eventContent}>
          <div className={classes.title}>{event?.eventName}</div>
          <div className={classes.organizer}>{`${event?.User?.firstName} ${event?.User?.lastName}`}</div>
          <div className={classes.line} />
          <div className={classes.eventDetail}>
            <div className={classes.containerLocation}>
              <div className={classes.containerPlace}>
                <PlaceIcon />
                <span className={classes.location}>{event?.Location?.namaProvinsi}</span>
              </div>
              <div className={classes.containerVenueName}>
                <LocationCityIcon />
                <span className={classes.venueName}>{event.address}</span>
              </div>
            </div>
            <div className={classes.dateTime}>
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
            <div className={classes.ticketInfo}>
              <div className={classes.containerTicketInfo}>
                <span className={classes.ticketPrice}>{formattedPrice}</span>
                <span className={classes.ticketQuantity}>
                  <button type="button" onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}>
                    -
                  </button>
                  <input type="number" value={ticketQuantity} onChange={handleQuantityChange} />
                  <button type="button" onClick={() => setTicketQuantity(ticketQuantity + 1)}>
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
                    Offline
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
                    Online
                  </label>
                </div>
              )}
              <div className={classes.containerButton}>
                <span>Pembelian tiket ditutup dalam {countdown} </span>
                <button type="button" onClick={handleOrder} className={classes.buyNow}>
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.eventDescription}>
        <div className={classes.description}>
          <h2>Deskripsi</h2>
          <p>{event?.description}</p>
        </div>
        <div className={classes.line} />
        <div className={classes.creatorInfo}>
          <div className={classes.containerCreator}>
            <span>Tentang Kreator</span>
            <button type="button">Lihat Profil</button>
          </div>
          <div className={classes.containerProfil}>
            <img src="/assets/images/example.jpeg" alt="Porsche Club ID Logo" />
            <div className={classes.creatorText}>
              <h3>{`${event?.User?.firstName} ${event?.User?.lastName}`}</h3>
            </div>
          </div>
        </div>
        <div className={classes.line} />
      </div>
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
