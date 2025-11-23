import { useAuth } from 'react-oidc-context';
import { useEffect } from 'react';
import { hasRequiredGroup, getUserGroups, REQUIRED_GROUP } from '../utils/authorization';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication and authorization
 * Redirects unauthenticated users to the OIDC login flow
 * Shows error message for authenticated but unauthorized users
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useAuth();
  const isAuthorized = hasRequiredGroup(auth.user);
  const userGroups = getUserGroups(auth.user);

  useEffect(() => {
    // If not authenticated and not currently loading, trigger login
    if (!auth.isAuthenticated && !auth.isLoading && !auth.activeNavigator) {
      auth.signinRedirect();
    }
  }, [auth]);

  // Show loading state while checking authentication
  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Show loading state while redirecting to login
  if (!auth.isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // User is authenticated but not authorized
  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-8">
            <div className="text-red-600 dark:text-red-400 text-6xl mb-4 text-center">🚫</div>
            <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-3 text-center">
              Access Denied
            </h2>
            <p className="text-lg text-red-700 dark:text-red-300 mb-4 text-center">
              You do not have authorization to access this resource.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-md p-4 mb-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                <span className="font-semibold">Required Group:</span>{' '}
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{REQUIRED_GROUP}</code>
              </p>
              {userGroups.length > 0 ? (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Your Groups:</span>{' '}
                  {userGroups.map((group, index) => (
                    <code key={index} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded mr-1">
                      {group}
                    </code>
                  ))}
                </p>
              ) : (
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold">Your Groups:</span> <span className="italic">None</span>
                </p>
              )}
            </div>
            <p className="text-sm text-red-600 dark:text-red-400 text-center mb-4">
              Please contact your administrator to request access to the <strong>{REQUIRED_GROUP}</strong> group.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Go to Home
              </button>
              <button
                onClick={() => auth.signoutRedirect()}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // User is authenticated and authorized, render the protected content
  return <>{children}</>;
};
