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

import classes from './style.module.scss';

const UserDetailsDialog = ({ open, onClose, user }) => {
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullScreen={fullScreen}>
      <DialogTitle className={classes.dialogTitle}>User Details</DialogTitle>
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
            />
          </>
        ) : (
          <Avatar className={classes.avatar}>
            {user?.firstName?.split(' ')[0][0]} {user?.firstName?.split(' ') > 1 && user?.firstName?.split(' ')[1][0]}
          </Avatar>
        )}
      </div>

      <DialogContent className={classes.dialogContent}>
        <DialogContentText className={classes.dialogText}>
          Name: {user?.firstName} {user?.lastName}
        </DialogContentText>
        {user?.detailEventOrganizer && (
          <>
            <DialogContentText className={classes.dialogText}>
              Name KTP: {user?.detailEventOrganizer.namaLengkap}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>NIK: {user?.detailEventOrganizer.nik}</DialogContentText>
            <DialogContentText className={classes.dialogText}>
              Jenis Kelamin: {user?.detailEventOrganizer.jenisKelamin}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              Tempat Lahir: {user?.detailEventOrganizer.tempatLahir}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              Tanggal Lahir: {user?.detailEventOrganizer.tanggalLahir}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              Golongan Darah: {user?.detailEventOrganizer.golonganDarah}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              Alamat: {user?.detailEventOrganizer.alamat}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              Provinsi: {user?.detailEventOrganizer.provinsi}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              Kota/Kabupaten: {user?.detailEventOrganizer.kotaKabupaten}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              Kecamatan: {user?.detailEventOrganizer.kecamatan}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              Kelurahan: {user?.detailEventOrganizer.kelurahanDesa}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              Agama: {user?.detailEventOrganizer.agama}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              Status Perkawinan: {user?.detailEventOrganizer.statusPerkawinan}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              Pekerjaan: {user?.detailEventOrganizer.statusKerja}
            </DialogContentText>
            <DialogContentText className={classes.dialogText}>
              Kewarganegaraan: {user?.detailEventOrganizer.kewarganegaraan}
            </DialogContentText>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
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
