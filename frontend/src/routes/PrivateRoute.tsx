import useAuthStore from '@/stores/auth.store';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Wraps protected routes. Redirects unauthenticated users to /login.
 *
 * @returns The child route outlet or a redirect to /login
 */
const PrivateRoute = () => {
   const accessToken = useAuthStore((state) => state.accessToken);

   return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
