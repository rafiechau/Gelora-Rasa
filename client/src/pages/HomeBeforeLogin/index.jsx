import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { OurClient } from '@components/OurClient';
import { injectIntl } from 'react-intl';
import events1 from '@static/images/events1.jpg';
import events2 from '@static/images/events2.jpg';
import events3 from '@static/images/events3.jpg';
import person from '@static/images/person.jpg';
import toast from 'react-hot-toast';
import HeroSection from '@components/HeroSection';
import TopEventsSection from '@components/EventSection';
import ReviewSection from '@components/ReviewSection';
import StatisticsSection from '@components/StatisticsSection';
import Footer from '@components/Footer';
import { selectLogin } from '@containers/Client/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useEffect } from 'react';
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

const dummyReviews = [
  {
    name: 'John Doe',
    activity: 'Ordered tickets via Gelora Rasa',
    image: person,
    rating: 4.5,
    title: 'An Unforgettable Experience!',
    description:
      'The event was absolutely thrilling, with seamless ticket purchasing from Gelora Rasa. Highly recommended for those looking for quality events and hassle-free bookings!',
  },
];

const HomeBeforeLoginPage = ({ login, intl: { formatMessage } }) => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  useEffect(() => {
    if (login) {
      toast.error(formatMessage({ id: 'app_already_login' }));
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    }
  }, [formatMessage, login, navigate]);

  return (
    <section className={classes.homeBeforeLogin}>
      <HeroSection onNavigate={handleNavigate} />
      <OurClient />
      <TopEventsSection events={dummyEvents} onNavigate={handleNavigate} />
      <ReviewSection reviews={dummyReviews} />
      <StatisticsSection />
      <Footer />
    </section>
  );
};

const mapStateToProps = createStructuredSelector({
  login: selectLogin,
});

HomeBeforeLoginPage.propTypes = {
  login: PropTypes.bool,
  intl: PropTypes.object,
};

export default connect(mapStateToProps)(injectIntl(HomeBeforeLoginPage));
