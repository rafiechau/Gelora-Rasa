import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import InputTextField from '@components/InputTextField';
import ReactQuill from 'react-quill';
import toast from 'react-hot-toast';
import { FormattedMessage, injectIntl } from 'react-intl';
import { actionCreateEvent, actionUpdateEventEventOrganizer } from '@pages/Dashboard/MyEvents/actions';
import { actionGetAllCategories, actionGetAllLocation } from '@pages/Home/actions';
import { selectAllCategories, selectAllLocation } from '@pages/Home/selectors';
import { selectToken, selectUser } from '@containers/Client/selectors';
import { createStructuredSelector } from 'reselect';
import config from '@config/index';
import classes from './style.module.scss';

const EventDialog = ({ open, onClose, mode, myEvent, locations, categories, token, user, intl: { formatMessage } }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventStatus, setEventStatus] = useState('');
  const [description, setDescription] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isImageChanged, setIsImageChanged] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
    control,
    trigger,
  } = useForm({
    mode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {},
  });

  useEffect(() => {
    dispatch(actionGetAllCategories());
    dispatch(actionGetAllLocation());

    if (mode === 'edit' && myEvent) {
      setIsImageChanged(false);
      const imageURL = myEvent.image ? `${config.api.server}${myEvent.image.replace('\\', '/')}` : null;
      setImage(imageURL);
      setPreview(imageURL);
      // Set initial values for editing
      Object.keys(myEvent).forEach((key) => {
        if (key !== 'image') setValue(key, myEvent[key]);
      });
      if (myEvent.image) {
        setValue('image', 'exists', { shouldValidate: true });
      }
      setDescription(myEvent.description);
      setEventType(myEvent.type);
      setEventStatus(myEvent.status);
      setSelectedLocation(myEvent.locationId);
      setSelectedCategory(myEvent.categoryId);
      setValue('date', myEvent.date.split('T')[0]);
      setValue('registrationDealine', myEvent.registrationDealine.split('T')[0]);
    } else {
      // Reset for creating new event
      reset();
      setImage(null);
      setDescription('');
      setEventType('');
      setEventStatus('');
      setSelectedLocation('');
      setSelectedCategory('');
    }
  }, [mode, myEvent, dispatch, setValue, reset]);

  useEffect(() => {
    register('image', { required: 'Gambar event wajib diunggah' });
  }, [register]);

  const handleFiles = (files) => {
    if (files.length > 0) {
      const file = files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setIsImageChanged(true);
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
    setValue('type', event.target.value);
  };

  const handleEventStatusChange = (event) => {
    setEventStatus(event.target.value);
    setValue('status', event.target.value);
  };

  const handleDescriptionChange = (value) => {
    setDescription(value);
    setValue('description', value);
    trigger('description');
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
    const formData = new FormData();

    const eventDateString = data.date.trim();
    const registrationDeadlineString = data.registrationDealine.trim();

    // Parse the dates
    const eventDate = new Date(eventDateString);
    const deadlineDate = new Date(registrationDeadlineString);

    // Compare the dates
    if (deadlineDate >= eventDate) {
      toast.error('Registration deadline cannot be on or after the event date.');
      return; // Prevent the form from submitting
    }
    // Proceed with form submission
    // ... rest of your submit logic

    formData.append('eventName', data.eventName);
    formData.append('date', data.date);
    const formattedTime = data.time ? data.time.substring(0, 5) : '';
    formData.append('time', formattedTime);
    formData.append('registrationDealine', data.registrationDealine);
    formData.append('address', data.address);
    formData.append('venueName', data.venueName);
    formData.append('price', data.price);
    formData.append('stok', data.stok);
    formData.append('type', eventType);
    formData.append('status', eventStatus);
    formData.append('description', data.description);
    formData.append('locationId', data.locationId);
    formData.append('categoryId', data.categoryId);
    formData.append('userId', user.id);

    if (isImageChanged && image instanceof File) {
      formData.append('image', image);
    } else {
      formData.append('image', myEvent?.image);
    }
    if (mode === 'create') {
      dispatch(actionCreateEvent(formData, token));
    } else if (mode === 'edit') {
      dispatch(actionUpdateEventEventOrganizer(myEvent.id, formData, token));
    }

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" data-testid="event-dialog">
      <DialogTitle>
        {/* {formatMessage({ id: mode === 'create' ? 'Tambah Event' : 'Edit Event' })} */}
        <IconButton onClick={onClose} style={{ position: 'absolute', right: 8, top: 8 }} data-testid="close-button">
          <CloseSharpIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
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
          <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
            <InputLabel id="demo-simple-select-label">
              <FormattedMessage id="app_event_type_name" />
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...register('type', { required: 'Tipe event wajib dipilih' })}
              label="Type Event"
              value={eventType}
              onChange={handleEventTypeChange}
              error={!!errors.type}
            >
              <MenuItem value="hybrid">
                <FormattedMessage id="app_hybrid" />
              </MenuItem>
              <MenuItem value="offline">
                <FormattedMessage id="app_offline" />
              </MenuItem>
              <MenuItem value="online">
                <FormattedMessage id="app_online" />
              </MenuItem>
            </Select>
            {errors.type && <span className={classes.error}>{errors.type.message}</span>}
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
          <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
            <InputLabel id="demo-simple-select-label">
              <FormattedMessage id="app_event_status_name" />
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              {...register('status', { required: 'Status event wajib dipilih' })}
              label="Status Event"
              value={eventStatus}
              onChange={handleEventStatusChange}
              error={!!errors.status}
            >
              <MenuItem value="active">
                <FormattedMessage id="app_active" />
              </MenuItem>
              <MenuItem value="non-active">
                <FormattedMessage id="app_non_active" />
              </MenuItem>
            </Select>
            {errors.status && <span className={classes.error}>{errors.status.message}</span>}
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
              onChange={(event) => {
                handleFiles(event.target.files);
                setValue('image', event.target.files[0] || 'exists', { shouldValidate: true });
              }}
            />
            {errors.image && image !== 'exists' && (
              <span className={classes.error}>
                <FormattedMessage id="app_image_required" />
              </span>
            )}
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
          <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
            <InputLabel id="location-select-label">
              <FormattedMessage id="app_event_location" />
            </InputLabel>
            <Select
              labelId="location-select-label"
              id="location-select"
              {...register('locationId', { required: 'Lokasi event wajib dipilih' })}
              value={selectedLocation}
              label="Location"
              onChange={handleLocationChange}
              error={!!errors.locationId}
            >
              {locations.map((location) => (
                <MenuItem key={location.id} value={location.id}>
                  {location.namaProvinsi}
                </MenuItem>
              ))}
            </Select>
            {errors.locationId && <span className={classes.error}>{errors.locationId.message}</span>}
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
            <InputLabel id="category-select-label">
              <FormattedMessage id="app_event_category" />
            </InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              {...register('categoryId', { required: 'Lokasi event wajib dipilih' })}
              value={selectedCategory}
              label="Category"
              onChange={handleCategoryChange}
              error={!!errors.categoryId}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
            {errors.categoryId && <span className={classes.error}>{errors.categoryId.message}</span>}
          </FormControl>
          <Controller
            name="description"
            control={control}
            rules={{ required: 'Deskripsi event wajib diisi' }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <ReactQuill
                  value={value}
                  onChange={(content, delta, source, editor) => {
                    onChange(content); // Memperbarui form state
                    handleDescriptionChange(content); // Memperbarui state lokal dan memicu validasi
                  }}
                  className={error ? classes.errorBorder : ''}
                />
                {error && <span className={classes.error}>{error.message}</span>}
              </>
            )}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} data-testid="submit-button">
            {mode === 'create' ? (
              <FormattedMessage id="app_create_event" defaultMessage="Create Event" />
            ) : (
              <FormattedMessage id="app_update_event" defaultMessage="Update Event" />
            )}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

EventDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  myEvent: PropTypes.object,
  locations: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locations: selectAllLocation,
  categories: selectAllCategories,
  token: selectToken,
  user: selectUser,
});

export default injectIntl(connect(mapStateToProps)(EventDialog));
