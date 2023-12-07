import { injectIntl } from 'react-intl';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PlaceIcon from '@mui/icons-material/Place';
import LocationCityIcon from '@mui/icons-material/LocationCity';

import classes from './style.module.scss';

const DetailEventPage = () => {
  const dispatch = useDispatch();

  return (
    <div className={classes.containerDetail}>
      <div className={classes.detail}>
        <div className={classes.eventImage}>
          <img src="/assets/images/example.jpeg" alt="Mandalika Touring Event" />
        </div>
        <div className={classes.eventContent}>
          <h1>PCI X TIPTIP MANDALIKA & LOMBOK TOURING 2023</h1>
          <p className={classes.organizer}>Oleh Porsche Club ID</p>
          <div className={classes.line} />
          <div className={classes.eventDetail}>
            <div className={classes.containerLocation}>
              <div className={classes.containerPlace}>
                <PlaceIcon />
                <span className={classes.location}>Lombok</span>
              </div>
              <div className={classes.containerVenueName}>
                <LocationCityIcon />
                <span className={classes.venueName}>Lombok Island, Mandalika International Circuit</span>
              </div>
            </div>
            <div className={classes.dateTime}>
              <div className={classes.containerDateTime}>
                <span className={classes.date}>28 November 2023 - 09 December 2023</span>
              </div>
              <div className={classes.containerDateTime}>
                <span className={classes.time}>10:28 - 23:45</span>
              </div>
              <div className={classes.containerDateTime}>
                <span className={classes.eventType}>Offline Session</span>
              </div>
            </div>
            <div className={classes.ticketInfo}>
              <div className={classes.containerTicketInfo}>
                <span className={classes.ticketPrice}>Rp25.000.000</span>
                <span className={classes.ticketQuantity}>
                  <button type="button">-</button>
                  <input type="number" value="1" />
                  <button type="button">+</button>
                </span>
              </div>
              <div className={classes.containerButton}>
                <span>Pembelian tiket ditutup dalam 2 hari </span>
                <button type="button" className={classes.buyNow}>
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
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
            Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
            Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem
            Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable
            source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular
            during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
            section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced
            in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
          </p>
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
              <h3>Porsche Club ID</h3>
              <p>141 Followers</p>
            </div>
          </div>
        </div>
        <div className={classes.line} />
      </div>
    </div>
  );
};

DetailEventPage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export default injectIntl(connect(mapStateToProps)(DetailEventPage));
