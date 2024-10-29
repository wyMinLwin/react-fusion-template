import axios from "axios";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import Cookies from 'js-cookie'

axios.defaults.baseURL = 'https://crc-api-test.azurewebsites.net/api/v1/';

// Add a request interceptor
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
      const token = Cookies.get('react-template-app-token');
        if (token) {
          config.headers!.Authorization = `Bearer ${token}`;
        }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page if unauthorized
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axios;