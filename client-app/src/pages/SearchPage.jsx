import React from 'react';
import { Box, Grid } from '@mui/material';

import { SearchRefinement, SearchResult } from '../features/search';

const SearchPage = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={3}>
        <Box sx={{ px: 2 }}>
          <SearchRefinement
            attribute='categories'
            sortBy={['name:asc', 'count:desc']}
            limit={5}

          />
        </Box>
      </Grid>
      <Grid item xs={12} sm={9}>
        <SearchResult />
      </Grid>
    </Grid>
  );
};

export default SearchPage;
