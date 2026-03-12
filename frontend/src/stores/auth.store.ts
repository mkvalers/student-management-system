import { create } from 'zustand';

interface AuthState {
   accessToken: string | null;
   setAccessToken: (token: string | null) => void;
   clearAuth: () => void;
}

/**
 * Global auth store. Holds the in-memory access token.
 * Do not persist this to localStorage — the refresh token cookie handles session revival.
 */
const useAuthStore = create<AuthState>((set) => ({
   accessToken: null,
   setAccessToken: (token) => set({ accessToken: token }),
   clearAuth: () => set({ accessToken: null }),
}));

export default useAuthStore;
