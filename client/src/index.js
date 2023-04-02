import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';

import App from './App';
import { store } from './store';

import './index.css';
import 'simplebar-react/dist/simplebar.min.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <HelmetProvider>
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  </HelmetProvider>
);
