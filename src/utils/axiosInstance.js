// services/axiosInstance.js

import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,  // Ensure your environment variable is set
  timeout: 10000,
});

// Request interceptor to add token to the request headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // Or wherever you're storing the token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle token refresh or errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration or redirect to login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
