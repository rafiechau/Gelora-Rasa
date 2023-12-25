import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { useEffect, useRef, useState } from 'react';
import { Edit } from '@mui/icons-material';
import { SideBar } from '@components/sidebar';
import { Avatar, Box, Skeleton } from '@mui/material';
import { selectToken, selectUser } from '@containers/Client/selectors';
import config from '@config/index';
import DeleteConfirmationDialog from '@components/DeleteConfirmationDialog';
import EditProfileDialog from '@components/EditDialogProfile';
import { Form, useNavigate } from 'react-router-dom';
import BottomBar from '@components/BottomNavigation';
import { actionDeleteAccount, actionEditPhotoProfile, actionGetProfile, actionResetProfile } from './actions';
import { selectProfile } from './selectors';

import styles from './style.module.scss';
import classes from '../style.module.scss';

const ProfilePage = ({ user, profile, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const [loading, setLoading] = useState(true);
  const [currentEditingProfile, setCurrentEditingProfile] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const getRoleName = (role) => {
    switch (role) {
      case 1:
        return 'Standard User';
      case 2:
        return 'Event Organizer';
      case 3:
        return 'Admin';
      default:
        return 'Unknown Role';
    }
  };

  const handleEdit = (profileUser) => {
    setCurrentEditingProfile(profileUser);
    setIsEditDialogOpen(true);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleDelete = () => {
    handleOpenConfirmDialog();
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleConfirmDelete = () => {
    dispatch(
      actionDeleteAccount(token, () => {
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      })
    );
    handleCloseConfirmDialog();
  };

  useEffect(() => {
    if (!profile && user?.id) {
      dispatch(actionGetProfile(user?.id));
    }
    return () => {
      if (profile) {
        dispatch(actionResetProfile());
      }
    };
  }, [dispatch, profile, user?.id]);

  const handleImageChange = (e) => {
    dispatch(actionEditPhotoProfile(e.target.files[0]));
  };

  return (
    <div className={classes.app}>
      <Box
        sx={{
          width: '100%',
          display: { xs: 'block', sm: 'none' },
          position: 'fixed',
          bottom: 0,
          zIndex: 1000,
        }}
      >
        <BottomBar />
      </Box>
      <div className={classes.ProfilePage}>
        <SideBar user={user} />
        <div className={styles.containerProfilePage}>
          <div className={classes.title}>
            <FormattedMessage id="app_header_my_profiles" />
          </div>
          <input
            type="file"
            ref={fileInput}
            style={{ display: 'none' }}
            onChange={handleImageChange}
            accept="image/*"
          />
          <div className={styles.imgWrap} onClick={() => fileInput.current.click()}>
            <Edit className={styles.buttonEdit} />
            {profile?.imagePath ? (
              <>
                {loading && <Skeleton variant="circle" className={styles.skeleton} />}
                <img
                  src={`${config.api.server}${profile?.imagePath}`}
                  alt={profile?.fullName}
                  loading="lazy"
                  onLoad={() => setLoading(false)}
                />
              </>
            ) : (
              <Avatar className={styles.avatar}>
                {profile?.firstName?.split(' ')[0][0]}{' '}
                {profile?.firstName?.split(' ') > 1 && profile?.firstName?.split(' ')[1][0]}
              </Avatar>
            )}
          </div>
          <p>
            <FormattedMessage id="app_profile_firstName" /> : {profile?.firstName}
          </p>
          <p>
            <FormattedMessage id="app_profile_lastName" /> : {profile?.lastName}
          </p>
          <p>
            <FormattedMessage id="app_profile_email" /> : {profile?.email}
          </p>
          <p>
            <FormattedMessage id="app_profile_role" /> : {getRoleName(profile?.role)}
          </p>

          <button type="button" onClick={() => handleEdit(profile)} className={styles.buttonSubmit}>
            <FormattedMessage id="app_btn_edit_profile" />
          </button>
          <button type="button" onClick={() => handleDelete()} className={styles.buttonDeleteAccount}>
            <FormattedMessage id="app_btn_delete_profile" />
          </button>
        </div>
      </div>
      <DeleteConfirmationDialog
        open={openConfirmDialog}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseConfirmDialog}
        dialogTitle={<FormattedMessage id="app_confirmation_delete_dialog" />}
        dialogContent={<FormattedMessage id="app_delete_dialog_header" />}
      />
      <EditProfileDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        profileUser={currentEditingProfile}
      />
    </div>
  );
};

ProfilePage.propTypes = {
  user: PropTypes.object,
  profile: PropTypes.object,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  user: selectUser,
  profile: selectProfile,
  token: selectToken,
});

export default connect(mapStateToProps)(ProfilePage);
