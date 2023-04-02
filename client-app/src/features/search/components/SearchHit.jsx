import React from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const SearchHit = ({ hit }) => {
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
  );
};

export default SearchHit;
