import axios from 'axios';

/**
 * Shared Axios instance for all API requests.
 *
 * - Development: requests go to `/api` and are forwarded by the Vite proxy to the Spring Boot backend.
 * - Production: requests go directly to `VITE_API_BASE_URL` (no proxy available).
 */
const apiClient = axios.create({
   baseURL: import.meta.env.PROD ? import.meta.env.VITE_API_BASE_URL : '/api',
   headers: {
      'Content-Type': 'application/json',
   },
   withCredentials: true,
});

export default apiClient;
