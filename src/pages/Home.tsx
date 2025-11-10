import { useAuth } from 'react-oidc-context';

export function Home() {
  const auth = useAuth();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Welcome to DevSecOps Home
      </h1>
      {auth.isAuthenticated ? (
        <div className="mt-8">
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
