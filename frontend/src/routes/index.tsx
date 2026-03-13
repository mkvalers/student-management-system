import HomePage from '@/pages/home/HomePage';
import LoginPage from '@/pages/auth/LoginPage';
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

/**
 * Application router. Public routes are accessible without authentication;
 * protected routes are wrapped in PrivateRoute which requires a valid access token.
 */
const router = createBrowserRouter([
   {
      path: '/login',
      element: <LoginPage />,
   },
   {
      element: <PrivateRoute />,
      children: [
         {
            path: '/',
            element: <HomePage />,
         },
      ],
   },
]);

export default router;
