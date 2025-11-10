# Design Document

## Overview

This design outlines a React-based static site built with Vite and TailwindCSS that provides OIDC authentication, theme switching, and navigation capabilities. The application follows a component-based architecture with clear separation of concerns between authentication, theming, and UI components.

## Architecture

### Technology Stack

- **Build Tool**: Vite (latest stable version)
- **Framework**: React 18+ with TypeScript and React Router for navigation
- **Styling**: TailwindCSS (latest stable version) with dark mode support
- **Authentication**: react-oidc-context library wrapping oidc-client-ts
- **State Management**: React Context API for theme management, react-oidc-context for auth state
- **Type Safety**: TypeScript for static type checking

### Application Structure

```
src/
├── components/
│   ├── Navbar.tsx          # Navigation bar component
│   ├── ThemeToggle.tsx     # Theme toggle button
│   └── ProtectedRoute.tsx  # Route wrapper for authenticated pages
├── contexts/
│   └── ThemeContext.tsx    # Theme state management
├── pages/
│   └── Home.tsx            # Home page component
├── config/
│   └── oidcConfig.ts       # OIDC provider configuration
├── types/
│   └── index.ts            # TypeScript type definitions
├── App.tsx                 # Root application component
├── main.tsx                # Application entry point
└── index.css               # Global styles and Tailwind imports
```

## Components and Interfaces

### 1. Authentication Layer

**OIDC Configuration** (`config/oidcConfig.ts`)
- Exports typed OIDC client configuration object
- Contains authority URL, client ID, redirect URIs, and scopes
- Configuration should be environment-aware (dev/prod)
- Uses TypeScript for type-safe configuration

**AuthProvider Integration** (`App.tsx`)
- Wraps the entire application with `AuthProvider` from react-oidc-context
- Provides authentication state and methods throughout the component tree
- Handles authentication callbacks and token management
- Properly typed with TypeScript interfaces

### 2. Theme Management

**ThemeContext** (`contexts/ThemeContext.tsx`)
- Provides theme state (dark/light) to all components
- Exposes `toggleTheme()` function
- Persists theme preference to localStorage
- Initializes theme from localStorage or system preference on mount
- Applies theme class to document root element
- Fully typed with TypeScript interfaces

**ThemeProvider Interface**:
```typescript
interface ThemeContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}
```

### 3. Navigation Component

**Navbar** (`components/Navbar.tsx`)
- Displays horizontally across the top of the page
- Contains:
  - Home tab/link (React Router Link)
  - ThemeToggle component
  - Login/Logout button (conditional based on auth state)
- Uses `useAuth()` hook to access authentication state
- Uses `useTheme()` hook to access theme state
- Styled with TailwindCSS responsive classes
- Properly typed with TypeScript

**ThemeToggle** (`components/ThemeToggle.tsx`)
- Icon button that calls `toggleTheme()`
- Displays sun icon in dark mode, moon icon in light mode
- Uses TailwindCSS for styling and transitions
- Typed component with proper event handlers

### 4. Page Components

**Home** (`pages/Home.tsx`)
- Landing page with welcome content
- Displays different content based on authentication state
- Styled with TailwindCSS
- TypeScript component with proper typing

### 5. Routing

**App Component** (`App.tsx`)
- Sets up React Router with routes
- Wraps routes with AuthProvider and ThemeProvider
- Defines route structure:
  - `/` - Home page
  - Additional routes can be added as needed
- Fully typed with TypeScript

## Data Models

### Theme State
```typescript
type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
}
```

### Authentication State (from react-oidc-context)
```typescript
interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  signinRedirect: () => Promise<void>;
  signoutRedirect: () => Promise<void>;
}
```

### OIDC Configuration
```typescript
interface OidcConfig {
  authority: string;
  client_id: string;
  redirect_uri: string;
  post_logout_redirect_uri: string;
  response_type: string;
  scope: string;
}
```

## Error Handling

### Authentication Errors
- Display user-friendly error messages when authentication fails
- Handle token expiration gracefully with automatic redirect to login
- Catch and log OIDC provider connection errors
- Provide fallback UI when authentication service is unavailable

### Theme Persistence Errors
- Gracefully handle localStorage access failures
- Fall back to system preference if localStorage is unavailable
- Default to light mode if no preference can be determined

### Navigation Errors
- Implement error boundaries for route components
- Display 404 page for unknown routes
- Handle navigation failures with user feedback

## Testing Strategy

### Unit Tests
- Theme context toggle functionality
- Theme persistence to/from localStorage
- OIDC configuration validation
- Component rendering with different auth states

### Integration Tests
- Authentication flow (login/logout)
- Theme switching with persistence
- Navigation between routes
- Conditional rendering based on auth state

### Manual Testing
- OIDC provider integration with real identity provider
- Theme switching visual verification
- Responsive design across devices
- Browser compatibility (Chrome, Firefox, Safari, Edge)

## Configuration Requirements

### Environment Variables
The application requires the following environment variables:
- `VITE_OIDC_AUTHORITY` - OIDC provider authority URL
- `VITE_OIDC_CLIENT_ID` - Client ID from OIDC provider
- `VITE_OIDC_REDIRECT_URI` - Redirect URI after authentication
- `VITE_OIDC_POST_LOGOUT_REDIRECT_URI` - Redirect URI after logout

### TailwindCSS Configuration
- Enable dark mode with 'class' strategy
- Configure theme colors for both light and dark modes
- Set up responsive breakpoints
- Include necessary plugins if needed

### Vite Configuration
- Configure base path for deployment
- Set up environment variable handling
- Configure build output directory
- Enable React plugin with TypeScript support
- Configure TypeScript compiler options for React

### TypeScript Configuration
- Enable strict mode for type safety
- Configure JSX to use React 18+ transform
- Set up path aliases if needed
- Include proper type definitions for React, React Router, and libraries

## Deployment Considerations

- Static site can be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, S3, etc.)
- OIDC redirect URIs must be configured in the identity provider for each deployment environment
- Environment variables must be set appropriately for each environment
- Build output is fully static with no server-side requirements
