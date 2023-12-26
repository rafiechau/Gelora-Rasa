import { Link } from 'react-router-dom';
import logo from '@static/images/gelorasa-logo.png';
import FooterLinks from '@components/FooterLinks';
import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';

const Footer = () => (
  <footer className={classes.footer} data-testid="footer">
    <div className={classes.footerContainer} data-testid="footer-logo-container">
      <div className={classes.container}>
        <div className={classes.footerLogoContainer}>
          <Link to="/" className={classes.footerLogo}>
            <img src={logo} alt="Gelora Rasa" />
          </Link>
          <p className={classes.footerDescription} data-testid="footer-description">
            <FormattedMessage id="app_footer_description" />
          </p>
        </div>
        <div className={classes.footerLinksContainer}>
          <FooterLinks
            title={<FormattedMessage id="app_footer_features" />}
            items={[
              <FormattedMessage id="app_footer_features_virtual" />,
              <FormattedMessage id="app_footer_features_pricing" />,
              <FormattedMessage id="app_footer_features_merchant" />,
              <FormattedMessage id="app_footer_features_tickets" />,
            ]}
          />
          <FooterLinks
            title={<FormattedMessage id="app_footer_company" />}
            items={[
              <FormattedMessage id="app_footer_company_jobs" />,
              <FormattedMessage id="app_footer_company_api" />,
              <FormattedMessage id="app_footer_company_press" />,
              <FormattedMessage id="app_footer_company_sitemap" />,
            ]}
          />
          <FooterLinks
            title={<FormattedMessage id="app_footer_learn" />}
            items={[
              <FormattedMessage id="app_footer_learn_guidebook" />,
              <FormattedMessage id="app_footer_learn_inspiration" />,
              <FormattedMessage id="app_footer_learn_community" />,
              <FormattedMessage id="app_footer_learn_tools" />,
            ]}
          />
        </div>
      </div>

      <div className={classes.footerRights}>
        <FormattedMessage id="app_footer_rights" />
      </div>
    </div>
  </footer>
);

export default Footer;
