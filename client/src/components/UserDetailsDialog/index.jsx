import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Skeleton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import config from '@config/index';
import { useState } from 'react';

import { FormattedMessage } from 'react-intl';
import classes from './style.module.scss';

const UserDetailsDialog = ({ open, onClose, user }) => {
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullScreen={fullScreen} data-testid="user-details-dialog">
      <DialogTitle className={classes.dialogTitle} data-testid="dialog-title">
        <FormattedMessage id="app_title_user_details" />
      </DialogTitle>
      <div className={classes.imageContainer}>
        {loading && <Skeleton variant="circle" className={classes.skeleton} />}
        {user?.imagePath ? (
          <>
            {loading && <Skeleton variant="circle" className={classes.skeleton} />}
            <img
              src={`${config.api.server}${user?.imagePath}`}
              alt={user?.firstName}
              loading="lazy"
              className={classes.avatar}
              onLoad={() => setLoading(false)}
              data-testid="user-avatar"
            />
          </>
        ) : (
          <Avatar className={classes.avatar} data-testid="user-avatar">
            {user?.firstName?.split(' ')[0][0]} {user?.firstName?.split(' ') > 1 && user?.firstName?.split(' ')[1][0]}
          </Avatar>
        )}
      </div>

      <DialogContent className={classes.dialogContent}>
        <DialogContentText className={classes.dialogText}>
          <FormattedMessage id="app_column_name" />: {user?.firstName} {user?.lastName}
        </DialogContentText>
        {user?.detailEventOrganizer && (
          <>
            <DialogContentText className={classes.dialogText}>
              <FormattedMessage id="user_details_name_ktp" />: {user?.detailEventOrganizer.namaLengkap}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>NIK: {user?.detailEventOrganizer.nik}</DialogContentText>
            <DialogContentText className={classes.dialogText}>
              <FormattedMessage id="user_details_gender" />: {user?.detailEventOrganizer.jenisKelamin}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              <FormattedMessage id="user_details_birth_place" />: {user?.detailEventOrganizer.tempatLahir}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              <FormattedMessage id="user_details_birth_date" />: {user?.detailEventOrganizer.tanggalLahir}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              <FormattedMessage id="user_details_blood_type" />: {user?.detailEventOrganizer.golonganDarah}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              <FormattedMessage id="user_details_address" />: {user?.detailEventOrganizer.alamat}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              <FormattedMessage id="user_details_province" />: {user?.detailEventOrganizer.provinsi}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              <FormattedMessage id="user_details_city" />: {user?.detailEventOrganizer.kotaKabupaten}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              <FormattedMessage id="user_details_subdistrict" />: {user?.detailEventOrganizer.kecamatan}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              <FormattedMessage id="user_details_village" />: {user?.detailEventOrganizer.kelurahanDesa}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              <FormattedMessage id="user_details_religion" />: {user?.detailEventOrganizer.agama}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              <FormattedMessage id="user_details_marital_status" />: {user?.detailEventOrganizer.statusPerkawinan}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              <FormattedMessage id="user_details_job" />: {user?.detailEventOrganizer.statusKerja}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              <FormattedMessage id="user_details_nationality" />: {user?.detailEventOrganizer.kewarganegaraan}
            </DialogContentText>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} data-testid="close-button">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

UserDetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default UserDetailsDialog;
