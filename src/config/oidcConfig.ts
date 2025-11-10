import type { AuthProviderProps } from 'react-oidc-context';

/**
 * OIDC Configuration Interface
 * Defines the structure for OpenID Connect provider settings
 */
export interface OidcConfig {
  authority: string;
  client_id: string;
  redirect_uri: string;
  post_logout_redirect_uri: string;
  response_type: string;
  scope: string;
}

/**
 * OIDC Configuration
 * Loads configuration from environment variables
 */
const oidcConfig: AuthProviderProps = {
  authority: import.meta.env.VITE_OIDC_AUTHORITY || 'http://localhost:8181/realms/master/',
  client_id: import.meta.env.VITE_OIDC_CLIENT_ID || 'my-react-app',
  redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI || `${window.location.origin}/`,
  post_logout_redirect_uri: import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI || `${window.location.origin}/`,
  response_type: 'code',
  scope: 'openid profile email',
  // Automatic silent token renewal
  automaticSilentRenew: true,
  // Load user info from the token endpoint
  loadUserInfo: false,
  // Prevent multiple token requests during React StrictMode double-mounting
  monitorSession: false,
  onSigninCallback: () => {
    // Remove query parameters after successful authentication
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

export default oidcConfig;
