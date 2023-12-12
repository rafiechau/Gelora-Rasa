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
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
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

// Event
export const getEventApi = (token, page) =>
  callAPI(`${urls.events}/?page=${page}`, 'GET', { Authorization: `Bearer ${token}` });

export const deleteEventByIdApi = (eventId, token) =>
  callAPI(`${urls.events}/delete/${eventId}`, 'DELETE', { Authorization: `Bearer ${token}` });

export const createEventApi = (data, token) =>
  callAPI(`${urls.events}/create`, 'POST', { Authorization: `Bearer ${token}` }, {}, data);
export const updateEventByIdApi = (eventId, data, token) =>
  callAPI(`${urls.events}/update/${eventId}`, 'PUT', { Authorization: `Bearer ${token}` }, {}, data);

export const getEventByIdApi = (eventId, token) =>
  callAPI(`${urls.events}/detail/${eventId}`, 'GET', { Authorization: `Bearer ${token}` });

export const getMyEventApi = (token) => callAPI(`${urls.events}/myEvent`, 'GET', { Authorization: `Bearer ${token} ` });

// Order

export const createOrderApi = (eventId, data, token) =>
  callAPI(`${urls.orders}/create/${eventId}`, 'POST', { Authorization: `Bearer ${token}` }, {}, data);

export default (orderId, status, token) =>
  callAPI(`${urls.orders}/update-status/${orderId}`, 'PUT', { Authorization: `Bearer ${token}` }, {}, { status });

export const getMyOrdersApi = (token) =>
  callAPI(`${urls.orders}/getMyOrder`, 'GET', { Authorization: `Bearer ${token}` });

// event organizer
export const createEventOrganizerApi = (data, token) =>
  callAPI(`${urls.eventOrganizer}/create`, 'POST', { Authorization: `Bearer ${token}` }, {}, data);

// location
export const getLocationApi = (token) => callAPI(`${urls.location}/`, 'GET', { Authorization: `Bearer ${token}` });
export const createLocationApi = (data, token) =>
  callAPI(`${urls.location}/create`, 'POST', { Authorization: `Bearer ${token}` }, {}, data);
export const updateLocationByIdApi = (locationId, data, token) =>
  callAPI(`${urls.location}/update/${locationId}`, 'PUT', { Authorization: `Bearer ${token}` }, {}, data);
export const deleteLocationByIdApi = (locationId, token) =>
  callAPI(`${urls.location}/delete/${locationId}`, 'DELETE', { Authorization: `Bearer ${token}` });

// categories
export const getCategoriesApi = (token) => callAPI(`${urls.categories}/`, 'GET', { Authorization: `Bearer ${token}` });
export const createCategoryApi = (data, token) =>
  callAPI(`${urls.categories}/create`, 'POST', { Authorization: `Bearer ${token}` }, {}, data);
export const updateCategoryByIdApi = (categoryId, data, token) =>
  callAPI(`${urls.categories}/update/${categoryId}`, 'PUT', { Authorization: `Bearer ${token}` }, {}, data);
export const deleteCategoryByIdApi = (categoryId, token) =>
  callAPI(`${urls.categories}/delete/${categoryId}`, 'DELETE', { Authorization: `Bearer ${token}` });
