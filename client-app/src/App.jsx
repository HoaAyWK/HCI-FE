import React from 'react';
import algoliaSearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import { history } from 'instantsearch.js/es/lib/routers';

import Router from './routes';
import ThemeProvider from './theme';
import { AppThemeProvider } from './context/AppThemeContext';
import { AppSearchProvider } from './context/AppSearchContext';

const searchClient = algoliaSearch(import.meta.env.VITE_ALGOLIA_APP_ID, import.meta.env.VITE_ALGOLIA_API_KEY);
const indexName = import.meta.env.VITE_ALGOLIA_INDEX;

const searchRouting = {
  router: history({
    writeDelay: 400
  }),
  stateMapping: {
    stateToRoute(uiState) {
      const indexUiState = uiState[indexName];
      return {
        q: indexUiState.query,
        categories: indexUiState.menu?.categories,
        page: indexUiState.page
      };
    },
    routeToState(routeState) {
      return {
        [indexName]: {
          query: routeState.q,
          menu: {
            categories: routeState.categories
          },
          page: routeState.page
        }
      }
    }
  }
};

function App() {
  return (
    <AppThemeProvider>
      <ThemeProvider>
        <InstantSearch searchClient={searchClient} indexName={indexName} routing={searchRouting}>
          <AppSearchProvider>
            <Router />
          </AppSearchProvider>
        </InstantSearch>
      </ThemeProvider>
    </AppThemeProvider>
  );
}

export default App;
