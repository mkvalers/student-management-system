import axios, { type AxiosRequestConfig } from 'axios';
import useAuthStore from '@/stores/auth.store';

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

// Attach the in-memory access token to each outgoing request.
apiClient.interceptors.request.use((config) => {
   const token = useAuthStore.getState().accessToken;

   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }

   return config;
});

// On 401, try refresh once using refresh-token cookie, then retry the original request.
apiClient.interceptors.response.use(
   (response) => response,
   async (error) => {
      const originalRequest = error.config as AxiosRequestConfig & {
         _retry?: boolean;
      };

      const is401 = error.response?.status === 401;
      const isRefreshEndpoint = originalRequest.url?.includes('/auth/refresh');
      const alreadyRetried = originalRequest._retry;

      if (is401 && !isRefreshEndpoint && !alreadyRetried) {
         originalRequest._retry = true;

         try {
            const { data } = await apiClient.post<{ token: string }>(
               '/auth/refresh'
            );

            useAuthStore.getState().setAccessToken(data.token);
            return apiClient(originalRequest);
         } catch {
            useAuthStore.getState().clearAuth();
         }
      }

      return Promise.reject(error);
   }
);

export default apiClient;
