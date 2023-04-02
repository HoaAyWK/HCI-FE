import React from 'react';
import algoliaSearch from 'algoliasearch/lite';
// import { InstantSearch  } from 'react-instantsearch-hooks-web';

import Autocomplete from './Autocomplete';

const searchClient = algoliaSearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_API_KEY);
const indexName = process.env.REACT_APP_ALGOLIA_INDEX;

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
