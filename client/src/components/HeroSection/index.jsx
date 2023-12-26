/* eslint-disable react/no-unstable-nested-components */
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';
import slider1 from '@static/images/slider-image-1.jpg';
import slider2 from '@static/images/slider-image-2.jpg';
import slider3 from '@static/images/slider-image-3.jpg';
import { FormattedMessage, injectIntl } from 'react-intl';
import classes from './style.module.scss';

const GradientBlueText = ({ children }) => <span className={classes.textGradientBlue}>{children}</span>;

GradientBlueText.propTypes = {
  children: PropTypes.node.isRequired,
};

// Nested component for pink gradient text
const GradientPinkText = ({ children }) => <span className={classes.textGradientPink}>{children}</span>;

GradientPinkText.propTypes = {
  children: PropTypes.node.isRequired,
};
const HeroSection = ({ onNavigate }) => {
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

  return (
    <div
      className={classes.heroSection}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        opacity: isFading ? 0 : 1,
      }}
      data-testid="hero-section"
    >
      <div className={classes.heroHeadline} data-testid="hero-headline">
        <div className={classes.titleHeadline}>
          <FormattedMessage
            id="app_home_before_login_hero_headline"
            defaultMessage="Merasakan <span>Gejolak Gairah</span>, Menikmati <spanPink>Sensasi yang Tak Terlupakan</spanPink>"
            values={{
              span: (chunks) => <GradientBlueText>{chunks}</GradientBlueText>,
              spanPink: (chunks) => <GradientPinkText>{chunks}</GradientPinkText>,
            }}
          />
        </div>
        <div className={classes.textDescription} data-testid="hero-description">
          <FormattedMessage id="app_home_before_login_description" />
        </div>
        <button
          type="button"
          className={`${classes.btn} ${classes.btnPrimary}`}
          onClick={() => onNavigate('/login')}
          data-testid="hero-browse-button"
        >
          <FormattedMessage id="app_home_before_login_browse_button" />
        </button>
      </div>
    </div>
  );
};

HeroSection.propTypes = {
  onNavigate: PropTypes.func,
};

export default injectIntl(HeroSection);
