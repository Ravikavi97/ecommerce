import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Define the base API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle specific error status codes
    if (error.response) {
      const { status } = error.response;
      
      // Handle authentication errors
      if (status === 401) {
        // Clear local storage and redirect to login
        localStorage.removeItem('auth_token');
        // You might want to redirect to login page or dispatch an action
      }
      
      // Handle server errors
      if (status >= 500) {
        console.error('Server error occurred:', error.message);
      }
    } else if (error.request) {
      // Network errors
      console.error('Network error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Generic request function with error handling
export const apiRequest = async <T>(
  method: string,
  url: string,
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await apiClient({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Extract error message from response if available
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(errorMessage);
    }
    throw error;
  }
};

// Export convenience methods
export const get = <T>(url: string, config?: AxiosRequestConfig) => 
  apiRequest<T>('GET', url, undefined, config);

export const post = <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
  apiRequest<T>('POST', url, data, config);

export const put = <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
  apiRequest<T>('PUT', url, data, config);

export const patch = <T>(url: string, data?: any, config?: AxiosRequestConfig) => 
  apiRequest<T>('PATCH', url, data, config);

export const del = <T>(url: string, config?: AxiosRequestConfig) => 
  apiRequest<T>('DELETE', url, undefined, config);

export default apiClient;