import InputTextField from '@components/InputTextField';
import { selectToken, selectUser } from '@containers/Client/selectors';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import { actionUpdateEventById } from '@pages/Dashboard/MyEvents/actions';
import { actionGetAllCategories } from '@pages/Home/actions';
import { selectAllCategories, selectAllLocation } from '@pages/Home/selectors';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, injectIntl } from 'react-intl';
import ReactQuill from 'react-quill';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import config from '@config/index';
import classes from './style.module.scss';

export const EditEventDialog = ({
  open,
  onClose,
  intl: { formatMessage },
  locations,
  categories,
  token,
  user,
  myEvent,
}) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [eventType, setEventType] = useState('');
  const [eventStatus, setEventStatus] = useState('');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState(
    myEvent.image ? `${config.api.server}${myEvent.image.replace('\\', '/')}` : ''
  );
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');


  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (myEvent) {
      setValue('eventName', myEvent.eventName);
      setValue('date', myEvent.date.split('T')[0]);
      setValue('time', myEvent.time);
      setValue('registrationDealine', myEvent.registrationDealine.split('T')[0]); // Assuming the date is in ISO format
      setValue('address', myEvent.address);
      setValue('venueName', myEvent.venueName);
      setValue('price', myEvent.price);
      setValue('stok', myEvent.stok);
      setValue('description', myEvent.description);
      setValue('categoryId', myEvent.categoryId);
      setValue('locationId', myEvent.locationId);
      setValue('eventType', myEvent.type);
      setValue('eventStatus', myEvent.status);
      setEventType(myEvent.type);
      setEventStatus(myEvent.status);
      setSelectedLocation(myEvent.locationId);
      setSelectedCategory(myEvent.categoryId);

      setDescription(myEvent.description);
      // Image handling
      setPreview(myEvent.image ? `${config.api.server}${myEvent.image.replace('\\', '/')}` : '');
    }
  }, [myEvent, setValue]);

  useEffect(() => {
    dispatch(actionGetAllCategories());
  }, [dispatch]);

  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { files } = event.dataTransfer;
    handleFiles(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
    setValue('eventType', event.target.value);
  };

  const handleEventStatusChange = (event) => {
    setEventStatus(event.target.value);
    setValue('eventStatus', event.target.value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    setValue('description', value);
  };

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
    setValue('locationId', event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setValue('categoryId', event.target.value);
  };

  const onSubmit = (data) => {
    console.log(data)
    const formData = new FormData();
    formData.append('eventName', data.eventName);
    formData.append('date', data.date);
    const formattedTime = data.time ? data.time.substring(0, 5) : '';
    formData.append('time', formattedTime);
    formData.append('registrationDealine', data.registrationDealine);
    formData.append('address', data.address);
    formData.append('venueName', data.venueName);
    formData.append('price', data.price);
    formData.append('stok', data.stok);
    formData.append('type', data.eventType);
    formData.append('status', data.eventStatus);
    formData.append('description', data.description);
    formData.append('locationId', data.locationId);
    formData.append('categoryId', data.categoryId);
    formData.append('userId', user.id);


    console.log(image)
    if (image) {
      formData.append('image', image);
    }

    dispatch(actionUpdateEventById(myEvent.id, formData, token));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <FormattedMessage id="app_header_add_event" />
        <IconButton onClick={onClose} style={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseSharpIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <InputTextField
            input={{
              name: 'eventName',
              required: formatMessage({ id: 'app_event_name_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_event_name' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'date',
              required: formatMessage({ id: 'app_event_date_require_message' }),
              type: 'date',
              label: formatMessage({ id: 'app_event_date' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'time',
              required: formatMessage({ id: 'app_event_time_require_message' }),
              type: 'time',
              label: formatMessage({ id: 'app_event_time_name' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'registrationDealine',
              required: formatMessage({ id: 'app_event_registration_deadline_require_message' }),
              type: 'date',
              label: formatMessage({ id: 'app_event_registration_dealine_name' }),
            }}
            register={register}
            errors={errors}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              <FormattedMessage id="app_event_type_name" />
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={eventType}
              onChange={handleEventTypeChange}
            >
              <MenuItem value="hybrid">Hybrid</MenuItem>
              <MenuItem value="offline">Offline</MenuItem>
              <MenuItem value="online">Online</MenuItem>
            </Select>
          </FormControl>
          <InputTextField
            input={{
              name: 'address',
              required: formatMessage({ id: 'app_event_address_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_event_address_name' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'venueName',
              required: formatMessage({ id: 'app_event_venue_name_require_message' }),
              type: 'text',
              label: formatMessage({ id: 'app_event_venue_name' }),
            }}
            register={register}
            errors={errors}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              <FormattedMessage id="app_event_status_name" />
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Age"
              value={eventStatus}
              onChange={handleEventStatusChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="non-active">Non-Active</MenuItem>
            </Select>
          </FormControl>
          <label htmlFor="images" className={classes.dropContainer} onDrop={handleDrop} onDragOver={handleDragOver}>
            {preview ? (
              <img src={preview} alt="Preview" className={classes.imagePreview} />
            ) : (
              <span className={classes.dropTitle}>
                <FormattedMessage id="app_form_image" />
              </span>
            )}
            <input
              type="file"
              id="images"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={(event) => handleFiles(event.target.files)}
            />
          </label>
          <InputTextField
            input={{
              name: 'price',
              required: formatMessage({ id: 'app_event_price_require_message' }),
              type: 'number',
              label: formatMessage({ id: 'app_event_price_name' }),
            }}
            register={register}
            errors={errors}
          />
          <InputTextField
            input={{
              name: 'stok',
              required: formatMessage({ id: 'app_event_stok_require_message' }),
              type: 'number',
              label: formatMessage({ id: 'app_event_stok_name' }),
            }}
            register={register}
            errors={errors}
          />
          <FormControl fullWidth>
            <InputLabel id="location-select-label">
              <FormattedMessage id="app_event_location" />
            </InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              value={selectedLocation}
              label="Location"
              onChange={handleLocationChange}
            >
              {locations.map((location) => (
                <MenuItem key={location.id} value={location.id}>
                  {location.namaProvinsi}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">
              <FormattedMessage id="app_event_category" />
            </InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={selectedCategory}
              label="Category"
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* Add ReactQuill for content and image upload input */}
          <ReactQuill className={classes.quill} theme="snow" value={description} onChange={handleDescriptionChange} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Submit Tweet
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

EditEventDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  intl: PropTypes.object,
  locations: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  myEvent: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locations: selectAllLocation,
  categories: selectAllCategories,
  token: selectToken,
  user: selectUser,
});

export default injectIntl(connect(mapStateToProps)(EditEventDialog));