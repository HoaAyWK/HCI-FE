import React from 'react';
import { Box, Grid, Pagination } from '@mui/material';
import { usePagination, useHits } from 'react-instantsearch-hooks-web';

import { SearchHit } from './components';

const SearchResult = () => {
  const { hits } = useHits();
  const { nbPages, refine } = usePagination();

  const handlePageChange = (e, page) => {
    refine(page - 1);
  };

  return (
    <Box sx={{ height: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <Grid container spacing={2}>
          {hits.map((hit) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={hit.objectID}>
              <SearchHit hit={hit} />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ my: 2 }}>
          <Pagination count={nbPages} color='primary' onChange={handlePageChange} />
        </Box>
      </Box>
    </Box>
  );
};

export default SearchResult;