import PropTypes from 'prop-types';
import { Dialog, IconButton } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import classes from './style.module.scss';

const EventImage = ({ imageUrl, altText }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <>
      <div className={classes.eventImage} onClick={handleOpenDialog} data-testid="event-image">
        <img src={imageUrl} alt={altText} />
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog} data-testid="image-dialog">
        <IconButton
          onClick={handleCloseDialog}
          className={classes.closeButton}
          sx={{ display: 'none' }}
          data-testid="close-button"
        >
          <CloseIcon />
        </IconButton>
        <img src={imageUrl} alt={altText} className={classes.dialogImage} />
      </Dialog>
    </>
  );
};

EventImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
};

export default EventImage;
