import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

import { Banner } from './components';

const SECONDARY_IMAGES = [
  'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80',
];


const SecondaryBannerList = () => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2
        }}
      >
        <Typography variant='h4' component='h1' color='text.primary'>
          Sub banners
        </Typography>
        <Button variant='contained' color='primary'>Add</Button>
      </Box>
      <Grid container spacing={2}>
        {SECONDARY_IMAGES.map((image) => (
          <Grid item xs={12} sm={6} md={12} key={image}>
            <Banner key={image} image={image} height='120px' />
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default SecondaryBannerList;
