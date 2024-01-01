import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  auth: 'auth',
  events: 'events',
  orders: 'orders',
  eventOrganizer: 'event-organizer',
  location: 'location',
  categories: 'categories',
  streaming: 'streaming',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');

export const apiHandleRegister = (data) => callAPI(`${urls.auth}/register`, 'POST', {}, {}, data);
export const apiHandleSendVerifyEmail = (data) => callAPI(`${urls.auth}/verify-email`, 'POST', {}, {}, data);
export const apiHandleCheckOtpVerifyEmail = (data) => callAPI(`${urls.auth}/check-otp`, 'POST', {}, {}, data);
export const apiHandleLogin = (data) => callAPI(`${urls.auth}/login`, 'POST', {}, {}, data);
export const apiHandleSendForgotPassword = (data) => callAPI(`${urls.auth}/forgot-password`, 'POST', {}, {}, data);
export const apiHandleResetForgotPassword = (data) => callAPI(`${urls.auth}/reset-password`, 'PUT', {}, {}, data);

export const getAllUsersApi = (page, pageSize) =>
  callAPI(`${urls.auth}/all-users?page=${page}&pageSize=${pageSize}`, 'GET');

export const deleteUserByAdminApi = (userId) => callAPI(`${urls.auth}/delete-user-by-admin/${userId}`, 'DELETE');

export const deleteAccountApi = () => callAPI(`${urls.auth}/delete-account`, 'DELETE');

export const apiHandleGetProfile = () => callAPI(`${urls.auth}/profile`, 'GET');
export const apiHandleEditPhotoProfile = (data) =>
  callAPI(`${urls.auth}/edit/photoProfile`, 'PUT', { 'Content-Type': 'multipart/form-data' }, {}, data);
export const apiHandleEditProfile = (data) => callAPI(`${urls.auth}/edit/profile`, 'PUT', {}, {}, data);

// Event
export const getEventApi = (page, pageSize) =>
  callAPI(`${urls.events}/?page=${page}&pageSize=${pageSize}`, 'GET', {}, {});

export const deleteEventByIdApi = (eventId) => callAPI(`${urls.events}/delete/${eventId}`, 'DELETE');

export const createEventApi = (data) =>
  callAPI(`${urls.events}/create`, 'POST', { 'Content-Type': 'multipart/form-data' }, {}, data);
export const updateEventByIdApi = (eventId, data) =>
  callAPI(`${urls.events}/update/${eventId}`, 'PUT', { 'Content-Type': 'multipart/form-data' }, {}, data);

export const updateStatusEventByIdApi = (eventId, data) =>
  callAPI(`${urls.events}/update-status/${eventId}`, 'PUT', { 'Content-Type': 'multipart/form-data' }, {}, data);

export const getEventByIdApi = (eventId) => callAPI(`${urls.events}/detail/${eventId}`, 'GET');

export const getMyEventApi = () => callAPI(`${urls.events}/myEvent`, 'GET', {});

// Order

export const initialPayementApi = (eventId, data) =>
  callAPI(`${urls.orders}/initialPayment/${eventId}`, 'POST', {}, {}, data);

export const createOrderEvent = (data) => callAPI(`${urls.orders}/create`, 'POST', {}, {}, data);

export const hasUserOrderedEventApi = (eventId) => callAPI(`${urls.orders}/check-order/${eventId}`, 'GET');

export const getAllUserOrderEvent = (eventId) => callAPI(`${urls.orders}/get-order-user/${eventId}`, 'GET');

export const getMyOrdersApi = () => callAPI(`${urls.orders}/getMyOrder`, 'GET');

export const deleteMyOrderApi = (orderId) => callAPI(`${urls.orders}/delete/${orderId}`, 'DELETE');

// event organizer
export const createEventOrganizerApi = (data) => callAPI(`${urls.eventOrganizer}/create`, 'POST', {}, {}, data);

// location
export const getLocationApi = () => callAPI(`${urls.location}/`, 'GET');
export const createLocationApi = (data) => callAPI(`${urls.location}/create`, 'POST', {}, {}, data);
export const updateLocationByIdApi = (locationId, data) =>
  callAPI(`${urls.location}/update/${locationId}`, 'PUT', {}, {}, data);
export const deleteLocationByIdApi = (locationId) => callAPI(`${urls.location}/delete/${locationId}`, 'DELETE');

// categories
export const getCategoriesApi = () => callAPI(`${urls.categories}/`, 'GET');
export const createCategoryApi = (data) => callAPI(`${urls.categories}/create`, 'POST', {}, {}, data);
export const updateCategoryByIdApi = (categoryId, data) =>
  callAPI(`${urls.categories}/update/${categoryId}`, 'PUT', {}, {}, data);
export const deleteCategoryByIdApi = (categoryId) => callAPI(`${urls.categories}/delete/${categoryId}`, 'DELETE');

// streaming
export const createMeetingIdAPI = (data) => callAPI(`${urls.streaming}/send-meeting`, 'POST', {}, {}, data);

export const verifyUserForMeetingApi = (eventId) =>
  callAPI(`${urls.streaming}/verify-user-for-meeting`, 'POST', {}, {}, { eventId });
