import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { OurClient } from '@components/OurClient';

import slider1 from '@static/images/slider-image-1.jpg';
import slider2 from '@static/images/slider-image-2.jpg';
import slider3 from '@static/images/slider-image-3.jpg';
import events1 from '@static/images/events1.jpg';
import events2 from '@static/images/events2.jpg';
import events3 from '@static/images/events3.jpg';
import person from '@static/images/person.jpg';
import logo from '@static/images/gelorasa-logo.png';
import StarIcon from '@mui/icons-material/Star';

import classes from './style.module.scss';

const dummyEvents = [
  {
    title: 'Beachside Summer Party',
    category: 'Summer Party',
    date: 'July 20, 2023',
    image: events1,
  },
  {
    title: 'Neon Night Dance Party',
    category: 'Dance Party',
    date: 'August 5, 2023',
    image: events2,
  },
  {
    title: 'Rooftop Sunset Soiree',
    category: 'Evening Party',
    date: 'August 18, 2023',
    image: events3,
  },
];

const HomeBeforeLoginPage = () => {
  const navigate = useNavigate();

  const sliderImages = [slider1, slider2, slider3];

  const [backgroundImage, setBackgroundImage] = useState(sliderImages[0]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [nextImage, setNextImage] = useState(sliderImages[1]);

  const changeImage = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setBackgroundImage(nextImage);
      const nextIndex = (currentImageIndex + 1) % sliderImages.length;
      setNextImage(sliderImages[nextIndex]);
      setCurrentImageIndex(nextIndex);
      setIsFading(false);
    }, 1000);
  }, [currentImageIndex, nextImage, sliderImages]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      changeImage();
    }, 6000);

    return () => clearInterval(intervalId);
  }, [changeImage]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <section className={classes.homeBeforeLogin}>
      <div
        className={classes.heroSection}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: isFading ? 0 : 1,
        }}
      >
        <div className={classes.heroHeadline}>
          <div className={classes.titleHeadline}>
            Merasakan <span className={classes.textGradientBlue}>Gejolak Gairah</span>,<br />
            Menikmati <span className={classes.textGradientPink}>Sensasi yang Tak Terlupakan</span>
          </div>
          <div className={classes.textDescription}>
            Destinasi pilihan untuk mengeksplorasi dan memperkaya wawasan Anda melalui hiburan dan pengetahuan.
          </div>
          <button
            type="button"
            className={`${classes.btn} ${classes.btnPrimary}`}
            onClick={() => handleNavigate('/login')}
          >
            Browse Now
          </button>
        </div>
      </div>
      <OurClient />
      <div className={classes.topEventsSection}>
        <div className={classes.topEventsHeader}>
          <div className={classes.topEventsTitle}>Top Events</div>
          <button type="button" className={classes.browseAllButton} onClick={() => handleNavigate('/login')}>
            Browse All
          </button>
        </div>

        <div className={classes.cardsContainer}>
          {dummyEvents.map((event, index) => (
            <div key={index} className={classes.eventCard}>
              <img src={event.image} alt={event.title} className={classes.cardImage} />
              <h3>{event.title}</h3>
              <div className={classes.eventCategory}>{event.category}</div>
              <div className={classes.eventDate}>{event.date}</div>
            </div>
          ))}
        </div>
      </div>
      <section className={classes.reviewSection}>
        <div className={classes.reviewCard}>
          <div className={classes.cardContent}>
            <div className={classes.userInfo}>
              <img src={person} alt="User" className={classes.peopleReview} />
              <div className={classes.userDetails}>
                <h3 className={classes.userName}>John Doe</h3>
                <p className={classes.userActivity}>Ordered tickets via Gelora Rasa</p>
                <div className={classes.userRating}>
                  <StarIcon sx={{ color: 'yellow' }} />
                  <span>4.5/5 Stars</span>
                </div>
              </div>
            </div>
            <div className={classes.reviewText}>
              <h4 className={classes.reviewTitle}>An Unforgettable Experience!</h4>
              <p className={classes.reviewDescription}>
                The event was absolutely thrilling, with seamless ticket purchasing from Gelora Rasa. The entire process
                was user-friendly, and the event itself was beyond expectations. Highly recommended for those looking
                for quality events and hassle-free bookings!
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className={classes.statistics}>
        <div className={classes.statistic}>
          <span className={classes.statNumber}>150+</span>
          <span className={classes.statLabel}>Events Attended</span>
        </div>
        <div className={classes.statistic}>
          <span className={classes.statNumber}>3000+</span>
          <span className={classes.statLabel}>Tickets Sold</span>
        </div>
      </div>
      <footer className={classes.footer}>
        <div className={classes.footerContainer}>
          <div className={classes.container}>
            <div className={classes.footerLogoContainer}>
              <Link href="/" className={classes.footerLogo}>
                <img src={logo} alt="Gelora Rasa" />
              </Link>
              <p className={classes.footerDescription}>
                Semina adalah tempat di mana anda dapat mencari event sesuai dengan minat & terdekat.
              </p>
            </div>
            <div className={classes.footerLinksContainer}>
              <div className={classes.footerLinks}>
                <h4 className={classes.footerLinksTitle}>Features</h4>
                <div className={classes.footerLinkItem}>Virtual</div>
                <div className={classes.footerLinkItem}>Pricing</div>
                <div className={classes.footerLinkItem}>Merchant</div>
                <div className={classes.footerLinkItem}>Tickets</div>
              </div>
              <div className={classes.footerLinks}>
                <h4 className={classes.footerLinksTitle}>Company</h4>
                <div className={classes.footerLinkItem}>Jobs</div>
                <div className={classes.footerLinkItem}>API</div>
                <div className={classes.footerLinkItem}>Press</div>
                <div className={classes.footerLinkItem}>Sitemap</div>
              </div>
              <div className={classes.footerLinks}>
                <h4 className={classes.footerLinksTitle}>Learn</h4>
                <div className={classes.footerLinkItem}>Guidebook</div>
                <div className={classes.footerLinkItem}>Inspiration</div>
                <div className={classes.footerLinkItem}>Community</div>
                <div className={classes.footerLinkItem}>Tools</div>
              </div>
            </div>
          </div>

          <div className={classes.footerRights}>All Rights Reserved. Gelora Rasa 2023.</div>
        </div>
      </footer>
    </section>
  );
};

export default HomeBeforeLoginPage;
