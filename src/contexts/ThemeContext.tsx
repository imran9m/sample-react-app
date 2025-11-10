import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Theme, ThemeContextType } from '../types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getInitialTheme = (): Theme => {
  try {
    // Check localStorage first
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme === 'dark' || storedTheme === 'light') {
      return storedTheme;
    }
  } catch (error) {
    console.warn('Failed to access localStorage for theme preference:', error);
  }

  // Fall back to system preference
  try {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (error) {
    console.warn('Failed to access system theme preference:', error);
  }

  // Default to light mode
  return 'light';
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    // Apply theme class to document root element
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Persist theme preference to localStorage
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('Failed to persist theme preference to localStorage:', error);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
