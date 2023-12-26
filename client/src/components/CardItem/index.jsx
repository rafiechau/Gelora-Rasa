import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ShareIcon from '@mui/icons-material/Share';
import toast from 'react-hot-toast';
import config from '@config/index';
import { useNavigate } from 'react-router-dom';

const CardItem = ({ event }) => {
  const navigate = useNavigate();

  const navigateToDetailEvent = () => {
    navigate(`/detail/${event.id}`);
  };

  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(event?.price);

  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(event?.date));

  const imageUrl =
    event && event?.image
      ? `${config.api.server}${event?.image.replace('\\', '/')}`
      : 'https://source.unsplash.com/random';

  const handleShareClick = async () => {
    const url = `${window.location.origin}/detail/${event.id}`;
    const text = `Check out this event: ${event.eventName}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: event.eventName,
          text,
          url,
        });
        toast.success('Event shared successfully!');
      } else {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      toast.error('Failed to share event.');
    }
  };

  return (
    <Card
      data-testid="CardItem"
      sx={{
        maxWidth: 345,
        width: '100%',
        margin: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
        transition: '0.3s',
        '&:hover': {
          boxShadow: '0 16px 32px 0 rgba(0,0,0,0.2)',
        },
        borderRadius: '8px',
        overflow: 'hidden',
        '@media (max-width: 600px)': {
          maxWidth: '100%', // Reducing the max width
          margin: '8px', // Adjust margin as needed
          fontSize: '0.9rem', // Optionally adjust font size for content
        },
        '@media (max-width: 1059px)': {
          justifyContent: 'center',
          alignItems: 'center',
        },
        '@media (max-width: 1070px) and (max-width: 900px)': {
          maxWidth: '100%',
          margin: '8px 0',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      <CardActionArea data-testid="card-action-area" onClick={() => navigateToDetailEvent(event.id)}>
        <CardMedia
          data-testid="card-media"
          component="img"
          height="300"
          image={imageUrl}
          alt={event.eventName}
          sx={{ objectFit: 'cover', width: '100%' }}
        />
        <CardContent
          data-testid="card-content"
          sx={{
            bgcolor: 'rgba(29, 36, 51, 0.9)',
            color: 'white',
            flexGrow: 1,
            height: '100%',
            padding: '16px', // Jika Anda ingin padding di dalam card content
            '&:last-child': { marginBottom: 0 },
          }}
        >
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
          width: '100%',
          marginLeft: '15px',
          bgcolor: '#16202A',
          padding: '16px',
          justifyContent: 'space-between',
          marginTop: 0, // Pastikan margin top adalah 0
          '&:last-child': {
            paddingBottom: '16px', // Memastikan padding bottom pada CardActions
          },
        }}
      >
        <Button size="small" sx={{ color: 'white' }} startIcon={<ShareIcon />} onClick={handleShareClick}>
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

CardItem.propTypes = {
  event: PropTypes.object.isRequired,
};

export default CardItem;
