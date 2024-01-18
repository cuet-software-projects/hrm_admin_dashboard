import axios, { AxiosResponse } from 'axios';

import useAuthStore from '../../store/authStore';
import { getBaseUrl } from '../configs/envConfig';
import ErrorHandler from './errorHandler';

const API_BASE_URL = getBaseUrl();
const axiosInstance = (token = null) => {
  const instance = axios.create();

  instance.defaults.headers.post['Content-Type'] = 'application/json';
  instance.defaults.headers['Accept'] = 'application/json';

  instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  instance.defaults.timeout = 60000;
  instance.defaults.baseURL = API_BASE_URL;
  const authData = localStorage?.getItem('auth')
    ? JSON.parse(localStorage.getItem('auth') || '')
    : '';

  // Logout if accessToken not found or the time expires
  if (!authData?.accessToken || !authData?.expiresIn) {
    useAuthStore.getState().logout();
  }

  // Logout if time is expired
  if (authData?.expiresIn && authData?.expiresIn < Date.now()) {
    useAuthStore.getState().logout();
  }

  if (authData?.accessToken) {
    token = authData.accessToken;
  }
  if (token) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }

  instance.interceptors.request.use(
    function (config) {
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function (response: AxiosResponse<any, any>) {
      const responseObject: any = {
        success: true,
        statusCode: response?.data?.statusCode,
        message: response?.data?.message,
        data: response?.data?.data,
        meta: response?.data?.meta,
      };
      return responseObject;
    },
    function (error) {
      if (error.response.status === 401) {
        useAuthStore.getState().logout();
      }
      const responseObject: any = {
        success: false,
        statusCode: error?.response?.data?.statusCode || 500,
        message: error?.response?.data?.message || 'Something Went Wrong',
        errorMessages: error?.response?.data?.message,
      };
      ErrorHandler.handle(responseObject);
      return Promise.reject(responseObject);
    },
  );
  return instance;
};
export default axiosInstance;
