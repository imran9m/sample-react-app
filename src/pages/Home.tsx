import { useAuth } from 'react-oidc-context';
import { hasRequiredGroup, getUserGroups, REQUIRED_GROUP } from '../utils/authorization';

export function Home() {
  const auth = useAuth();
  const isAuthorized = hasRequiredGroup(auth.user);
  const userGroups = getUserGroups(auth.user);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent pb-2">
          Welcome to DevSecOps
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Secure, scalable, and automated infrastructure management for modern applications.
        </p>
      </div>

      {auth.isAuthenticated ? (
        <div className="mt-8">
          {isAuthorized ? (
            <div className="space-y-8">
              <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center justify-center mb-6">
                  <div className="h-16 w-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <span className="text-3xl">👋</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">
                  Welcome Back!
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                  You are successfully logged in and authorized.
                </p>

                {auth.user && (
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                      User Profile
                    </h3>
                    <div className="space-y-3">
                      {auth.user.profile.name && (
                        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                          <span className="text-gray-600 dark:text-gray-400">Name</span>
                          <span className="font-medium text-gray-900 dark:text-white">{auth.user.profile.name}</span>
                        </div>
                      )}
                      {auth.user.profile.email && (
                        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                          <span className="text-gray-600 dark:text-gray-400">Email</span>
                          <span className="font-medium text-gray-900 dark:text-white">{auth.user.profile.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-red-100 dark:border-red-900/30">
                <div className="bg-red-50 dark:bg-red-900/20 p-8 text-center border-b border-red-100 dark:border-red-900/30">
                  <div className="h-20 w-20 bg-red-100 dark:bg-red-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-4xl">🚫</span>
                  </div>
                  <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-2">
                    Access Denied
                  </h2>
                  <p className="text-red-600 dark:text-red-300">
                    You do not have authorization to access this site.
                  </p>
                </div>

                <div className="p-8">
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 mb-6">
                    <div className="flex flex-col space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Required Group</span>
                        <code className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-mono">
                          {REQUIRED_GROUP}
                        </code>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">Your Groups</span>
                        <div className="flex flex-wrap justify-end gap-2">
                          {userGroups.length > 0 ? (
                            userGroups.map((group, index) => (
                              <code key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm font-mono">
                                {group}
                              </code>
                            ))
                          ) : (
                            <span className="text-gray-400 italic text-sm">None</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                      Please contact your administrator to request access.
                    </p>
                    <button
                      onClick={() => auth.signoutRedirect()}
                      className="px-6 py-2.5 bg-white border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 shadow-sm"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Secure', icon: '🔒', desc: 'Enterprise-grade security with OIDC authentication.' },
            { title: 'Scalable', icon: '📈', desc: 'Built on Kubernetes for effortless scaling.' },
            { title: 'Modern', icon: '⚡', desc: 'Powered by React and Vite for blazing speed.' },
          ].map((feature, i) => (
            <div key={i} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
