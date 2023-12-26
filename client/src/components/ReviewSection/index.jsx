import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';

const ReviewSection = ({ reviews }) => (
  <section className={classes.reviewSection} data-testid="review-section">
    {reviews.map((review, index) => (
      <div key={index} className={classes.reviewCard}>
        <div className={classes.cardContent}>
          <div className={classes.userInfo}>
            <img src={review.image} alt="User" className={classes.peopleReview} />
            <div className={classes.userDetails}>
              <h3 className={classes.userName}>{review.name}</h3>
              <p className={classes.userActivity}>{review.activity}</p>
              <div className={classes.userRating}>
                <StarIcon sx={{ color: 'yellow' }} />
                <span>
                  {review.rating}/5 <FormattedMessage id="app_stars" />
                </span>
              </div>
            </div>
          </div>
          <div className={classes.reviewText}>
            <h4 className={classes.reviewTitle}>{review.title}</h4>
            <p className={classes.reviewDescription}>{review.description}</p>
          </div>
        </div>
      </div>
    ))}
  </section>
);

ReviewSection.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      activity: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ReviewSection;
