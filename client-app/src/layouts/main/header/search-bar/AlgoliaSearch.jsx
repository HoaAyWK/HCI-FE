import React from 'react';
import algoliaSearch from 'algoliasearch/lite';
// import { InstantSearch  } from 'react-instantsearch-hooks-web';

import Autocomplete from './Autocomplete';

const searchClient = algoliaSearch(import.meta.env.VITE_ALGOLIA_APP_ID, import.meta.env.VITE_ALGOLIA_API_KEY);
const indexName = import.meta.env.VITE_ALGOLIA_INDEX;

const AlgoliaSearch = () => {

  return (
      <Autocomplete
        searchClient={searchClient}
        indexName={indexName}
        placeholder='Search...'
        openOnFocus
        detachedMediaQuery=''
      />
  );
};

export default AlgoliaSearch;
