import { createContext } from 'react';

const theme = localStorage.getItem('theme');

const ThemeContext = createContext({
  theme: theme || 'light',
  setTheme: () => {},
});

export default ThemeContext;
