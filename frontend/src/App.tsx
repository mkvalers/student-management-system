import { RouterProvider } from 'react-router-dom';
import router from './routes';

/**
 * Application shell. Bootstraps the client-side router.
 *
 * @returns The router provider for the SPA
 */
function App() {
   return <RouterProvider router={router} />;
}

export default App;
