import { Link } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const auth = useAuth();

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
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section - Home link */}
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
            >
              Home
            </Link>
            {auth.isAuthenticated && (
              <Link
                to="/namespace"
                className="text-lg font-semibold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                Namespaces
              </Link>
            )}
          </div>

          {/* Right section - Theme toggle and Auth button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {auth.isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
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
