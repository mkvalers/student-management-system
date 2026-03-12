import apiClient from '@/api/apiClient';

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

class AuthService {
   
   private endpoint: string;

   constructor(endpoint: string) {
      this.endpoint = endpoint;
   }

/**
 * Authenticates a user with email and password.
 * On success, the server sets a refresh token cookie automatically.
 *
 * @param credentials - The user's email and password
 * @returns The JWT access token response
 */
  login = async (credentials: LoginRequest): Promise<JwtResponse> => {
      const { data } = await apiClient.post<JwtResponse>(`${this.endpoint}/login`, credentials);
      return data;
   }
}

const useAuthService = new AuthService('/auth');

export default useAuthService;