import { connect, useDispatch } from 'react-redux';
import { injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useEffect, useRef, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import classes from './style.module.scss';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {});

  const handleImageChange = (e) => {};

  return (
    <div className={classes.ProfilePage}>
      <div className={classes.containerProfilePage}>
        <div>Profile Page</div>
        <input type="file" ref={fileInput} style={{ display: 'none' }} onChange={handleImageChange} accept="image/*" />
        {/* <div className={classes.imgWrap} onClick={() => fileInput.current.click()}>
          <EditIcon className={classes.buttonEdit} />
          {profile?.imagePath ? (
            <>
              {loading && <Skeleton variant="circle" className={classes.skeleton} />}
              <img
                src={`${config.api.server}${profile?.imagePath}`}
                alt={profile?.fullName}
                loading="lazy"
                onLoad={() => setLoading(false)}
              />
            </>
          ) : (
            <Avatar className={classes.avatar}>
              {profile?.fullName?.split(' ')[0][0]}{' '}
              {profile?.fullName?.split(' ') > 1 && profile?.fullName?.split(' ')[1][0]}
            </Avatar>
          )}
        </div> */}
      </div>
    </div>
  );
};

ProfilePage.propTypes = {};

const mapStateToProps = createStructuredSelector({});

export default injectIntl(connect(mapStateToProps)(ProfilePage));
