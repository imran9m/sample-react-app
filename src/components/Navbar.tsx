import { Link } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { ThemeToggle } from './ThemeToggle';
import { hasRequiredGroup } from '../utils/authorization';

export const Navbar = () => {
  const auth = useAuth();
  const isAuthorized = hasRequiredGroup(auth.user);

  const handleLogin = async () => {
    try {
      await auth.signinRedirect();
    } catch (error) {
      console.error('Login failed:', error);
      alert('Failed to initiate login. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signoutRedirect();
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Failed to logout. Please try again.');
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Home link */}
          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-200"
            >
              DevSecOps
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Home
              </Link>
              {auth.isAuthenticated && isAuthorized && (
                <Link
                  to="/namespaces"
                  className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                >
                  Namespaces
                </Link>
              )}
            </div>
          </div>

          {/* Right section - Theme toggle and Auth button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {auth.isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-medium rounded-full transition-all duration-200 border border-red-200 dark:border-red-800"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
