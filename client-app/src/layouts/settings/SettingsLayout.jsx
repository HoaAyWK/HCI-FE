import React from 'react';
import { Outlet } from 'react-router-dom';
import { Grid } from '@mui/material';

import { Navbar } from './nav';


const SettingsLayout = () => {
  return (
    <Grid container spacing={1} sx={{ mt: 4 }}>
      <Grid item xs={12} md={4} lg={3}>
        <Navbar />
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export default SettingsLayout;
