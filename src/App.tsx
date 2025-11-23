import { AuthProvider, useAuth } from 'react-oidc-context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import oidcConfig from './config/oidcConfig';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { NamespacesPage } from './pages/NamespacesPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorBoundary } from './components/ErrorBoundary';

function AppContent() {
  const auth = useAuth();

  // Handle authentication loading states
  if (auth.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300">Loading authentication...</p>
        </div>
      </div>
    );
  }

  if (auth.error) {
    const isServiceUnavailable =
      auth.error.message.includes('Failed to fetch') ||
      auth.error.message.includes('Network request failed') ||
      auth.error.message.includes('ECONNREFUSED');

    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="text-center max-w-md p-6">
          <div className="text-red-600 dark:text-red-400 text-5xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {isServiceUnavailable ? 'Authentication Service Unavailable' : 'Authentication Error'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {isServiceUnavailable
              ? 'Unable to connect to the authentication service. Please check your connection and try again.'
              : auth.error.message}
          </p>
          <div className="space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              Retry
            </button>
            {isServiceUnavailable && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                If the problem persists, please contact support.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
          <Navbar />
          <main className="flex-grow container mx-auto px-4 py-12">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/namespaces"
                  element={
                    <ProtectedRoute>
                      <NamespacesPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </ErrorBoundary>
          </main>
          <footer className="py-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} DevSecOps Platform. All rights reserved.</p>
          </footer>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <AuthProvider {...oidcConfig}>
      <AppContent />
    </AuthProvider>
  );
}

export default App
