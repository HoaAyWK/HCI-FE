import React from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
import algoliaSearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-hooks-web';

import Header from './header/Header';

const searchClient = algoliaSearch(import.meta.env.VITE_ALGOLIA_APP_ID, import.meta.env.VITE_ALGOLIA_API_KEY);
const indexName = import.meta.env.VITE_ALGOLIA_INDEX;

const RootStyle = styled('div')({
    minHeight: '100%',
    overflow: 'hidden'
});

const searchRouting = {
  stateMapping: {
    stateToRoute(uiState) {
      const indexUiState = uiState[indexName];
      return {
        q: indexUiState.query,
        categories: indexUiState.menu?.categories,
        page: indexUiState.page,
        tab: indexUiState.tab
      };
    },
    routeToState(routeState) {
      return {
        [indexName]: {
          query: routeState.q,
          menu: {
            categories: routeState.categories
          },
          page: routeState.page,
          tab: routeState.tab
        }
      }
    }
  }
};

export default function Layout() {

    return (
        <RootStyle>
            <InstantSearch searchClient={searchClient} indexName={indexName} routing={searchRouting}>
              <Header />
              <Container maxWidth='lg' sx={{ mt: 8 }}>
                <Outlet />
              </Container>
            </InstantSearch>
        </RootStyle>
    );
}
