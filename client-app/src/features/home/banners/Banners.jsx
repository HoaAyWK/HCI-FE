import React from 'react';
import { Grid, Stack } from '@mui/material';

import { SecondaryBanner } from './components';
import MainBannerSlider from './MainBannerSlider';

const SECONDARY_IMAGES = [
  'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80',
];

const Banners = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <MainBannerSlider />
      </Grid>
      <Grid item xs={12} md={5}>
        <Stack spacing={1}>
          {SECONDARY_IMAGES.map((image) => (
            <SecondaryBanner key={image} image={image} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Banners;
