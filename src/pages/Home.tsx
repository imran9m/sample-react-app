import { useAuth } from 'react-oidc-context';
import { hasRequiredGroup, getUserGroups, REQUIRED_GROUP } from '../utils/authorization';

export function Home() {
  const auth = useAuth();
  const isAuthorized = hasRequiredGroup(auth.user);
  const userGroups = getUserGroups(auth.user);

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Welcome to DevSecOps Home
      </h1>
      {auth.isAuthenticated ? (
        <div className="mt-8">
          {isAuthorized ? (
            <>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                You are logged in!
              </p>
              {auth.user && (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 max-w-md mx-auto">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">User Information</h2>
                  <div className="text-left space-y-2">
                    {auth.user.profile.name && (
                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Name:</span> {auth.user.profile.name}
                      </p>
                    )}
                    {auth.user.profile.email && (
                      <p className="text-gray-700 dark:text-gray-300">
                        <span className="font-medium">Email:</span> {auth.user.profile.email}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-8">
                <div className="text-red-600 dark:text-red-400 text-6xl mb-4">🚫</div>
                <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-3">
                  Access Denied
                </h2>
                <p className="text-lg text-red-700 dark:text-red-300 mb-4">
                  You do not have authorization to access this site.
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-md p-4 mb-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    <span className="font-semibold">Required Group:</span> <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">{REQUIRED_GROUP}</code>
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
                <p className="text-sm text-red-600 dark:text-red-400">
                  Please contact your administrator to request access to the <strong>{REQUIRED_GROUP}</strong> group.
                </p>
                <button
                  onClick={() => auth.signoutRedirect()}
                  className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Please log in to access the application.
          </p>
        </div>
      )}
    </div>
  );
}
