import React from 'react';
import { Grid } from '@mui/material';

import { AccountInfo } from './components';

const MyProfile = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <AccountInfo />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>

      </Grid>
    </Grid>
  );
};

export default MyProfile;
