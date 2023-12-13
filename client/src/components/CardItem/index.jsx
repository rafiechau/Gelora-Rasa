import { selectToken } from '@containers/Client/selectors';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ShareIcon from '@mui/icons-material/Share';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import config from '@config/index';
import { useNavigate } from 'react-router-dom';

const CardItem = ({ event, token }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navigateToDetailEvent = () => {
    navigate(`/detail/${event.id}`);
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(event.price);

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(event.date));

  const imageUrl =
    event && event?.image
      ? `${config.api.server}${event?.image.replace('\\', '/')}`
      : 'https://source.unsplash.com/random';

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
      <CardActionArea onClick={() => navigateToDetailEvent(event.id)}>
        <CardMedia component="img" height="200" image={imageUrl} alt={event.eventName} />
        <CardContent sx={{ bgcolor: 'rgba(29, 36, 51, 0.9)', color: 'white' }}>
          <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
            {event.eventName}
          </Typography>
          <Box display="flex" justifyContent="space-between" alignItems="center" mt={1} gap={2}>
            <Box>
              <Typography variant="caption" display="block" color="text.secondary">
                {formattedDate}
              </Typography>
              <Typography variant="caption" display="block" color="text.secondary">
                {event?.Location?.namaProvinsi}
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              sx={{ display: 'flex', alignItems: 'center', color: '#4DD0E1', fontWeight: 'medium' }}
            >
              {formattedPrice}
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
  event: PropTypes.object.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(CardItem);
