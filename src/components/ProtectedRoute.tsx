import { useAuth } from 'react-oidc-context';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute Component
 * Wraps routes that require authentication
 * Redirects unauthenticated users to the OIDC login flow
 */
export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const auth = useAuth();

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

  // User is authenticated, render the protected content
  return <>{children}</>;
};
