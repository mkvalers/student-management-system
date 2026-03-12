import './App.css';
import LoginPage from './pages/auth/LoginPage';

/**
 * Application shell.
 *
 * @returns The router provider for the SPA
 */
function App() {
   return (
      <div className="flex justify-center items-center h-screen">
         <LoginPage />
      </div>
   );
}

export default App;
