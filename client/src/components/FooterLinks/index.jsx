import PropTypes from 'prop-types';
import classes from './style.module.scss';

const FooterLinks = ({ title, items }) => (
  <div className={classes.footerLinks} data-testid="footer-links">
    <h4 className={classes.footerLinksTitle} data-testid="footer-links-title">
      {title}
    </h4>
    {items.map((item, index) => (
      <div key={index} className={classes.footerLinkItem} data-testid={`footer-link-item-${index}`}>
        {item}
      </div>
    ))}
  </div>
);

FooterLinks.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
};

export default FooterLinks;
