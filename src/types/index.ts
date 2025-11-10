/**
 * Theme type definition
 */
export type Theme = 'dark' | 'light';

/**
 * Theme Context Interface
 */
export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
