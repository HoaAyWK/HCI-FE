import React from 'react';
import { Grid } from '@mui/material';

import { AccountInfo, AccountCard } from './components';

const myAccount = {
  firstName: 'Sioay',
  lastName: 'Here',
  email: 'sioay@gmail.com',
  phone: '012939218',
  gender: 'male'
};

const MyProfile = () => {
  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AccountCard account={myAccount} />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        {children}
      </Grid>
    </Grid>
  );
};

export default MyProfile;
