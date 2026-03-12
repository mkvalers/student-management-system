import apiClient from '@/lib/axios';

/**
 * Login payload for the authentication endpoint.
 */
export interface LoginRequest {
   email: string;
   password: string;
}

/**
 * JWT response returned by the authentication endpoint.
 */
export interface JwtResponse {
   token: string;
}

/**
 * Authenticates a user with email and password.
 * On success, the server sets a refresh token cookie automatically.
 *
 * @param credentials - The user's email and password
 * @returns The JWT access token response
 */
export const login = async (credentials: LoginRequest): Promise<JwtResponse> => {
   const { data } = await apiClient.post<JwtResponse>('/auth/login', credentials);
   return data;
};
