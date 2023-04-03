import React from 'react';

import Router from './routes';
import ThemeProvider from './theme';
import { AppThemeProvider } from './context/AppThemeContext';
import { AppSearchProvider } from './context/AppSearchContext';




function App() {
  return (
    <AppThemeProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </AppThemeProvider>
  );
}

export default App;
