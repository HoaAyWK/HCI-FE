import React from 'react';
import { Box, Grid, Stack, Typography, Link, Pagination } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { RefinementList, usePagination, useHits } from 'react-instantsearch-hooks-web';

const HitItem = ({ hit }) => {
  return (
    <Box sx={{ maxHeight: 400 }}>
      <Link component={RouterLink} to='/products/thinkpad'>
        <Box
          component='img'
          src={hit.image}
          alt={hit.name}
          sx={{
            width: 'auto',
            height: 'auto',
            objectFit: 'cover'
          }}
        />
      </Link>
      <Stack spacing={2}>
        <Link component={RouterLink} to='/products/thinkpad'>
          <Typography variant='body1' component='h1'>
            {hit.name}
          </Typography>
        </Link>
      </Stack>
    </Box>
  )
}

const AHome = () => {
  const { hits } = useHits();
  const { nbPages, refine } = usePagination();

  const handlePageChange = (e, page) => {
    refine(page - 1);
  };

  return (
    <Box sx={{ height: '100%' }}>
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <Box>
            <RefinementList attribute='categories' />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
              {hits.map((hit) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={hit.objectID}>
                  <HitItem hit={hit} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ my: 2 }}>
              <Pagination count={nbPages} color='primary' onChange={handlePageChange} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AHome;
