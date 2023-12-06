import { selectToken } from '@containers/Client/selectors';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import ShareIcon from '@mui/icons-material/Share';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useState } from 'react';
import { useTheme } from '@emotion/react';

const CardItem = () => {
  const dispatch = useDispatch();
  
  return (
    <Card
      sx={{
        maxWidth: 345,
        margin: 2,
        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        '&:hover': {
          boxShadow: '0 16px 32px 0 rgba(0,0,0,0.2)',
        },
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="200"
          image="/static/images/cards/event-image.jpg" // Your image path here
          alt="Event Image"
        />
        <CardContent sx={{ bgcolor: 'rgba(29, 36, 51, 0.9)', color: 'white' }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            Event Title
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
            <Box>
              <Typography variant="caption" display="block" color="text.secondary">
                29 November 2023
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary">
                Jakarta
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{ display: 'flex', alignItems: 'center', color: '#4DD0E1', fontWeight: 'medium' }}
            >
              100.000,-
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          bgcolor: '#16202A',
          padding: '16px',
          justifyContent: 'space-between',
        }}
      >
        <Button size="small" sx={{ color: 'white' }} startIcon={<ShareIcon />}>
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

CardItem.propTypes = {
  post: PropTypes.object.isRequired,
  token: PropTypes.string,
  userHasVoted: PropTypes.object,
  onEdit: PropTypes.func,
  isEditable: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(CardItem);
