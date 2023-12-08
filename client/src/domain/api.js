import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  auth: 'auth',
  events: 'events',
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
