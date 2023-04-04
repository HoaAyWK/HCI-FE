import React from 'react';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

import { StatCard } from './components';
import IncomeChart from './IncomeChart';
import TopUsers from './top-users';
import PopularProducts from './popular-products';

const STATS = [
  {
    label: 'Total Users',
    total: 3912,
    isIncrease: true,
    value: '3',
    icon: 'ion:people'
  },
  {
    label: 'Total Orders',
    total: 587,
    isIncrease: false,
    value: '1',
    icon: 'solar:delivery-bold'
  },
  {
    label: 'Total Income',
    total: 42901,
    isIncrease: true,
    value: '4',
    icon: 'bi:credit-card-2-back'
  }
]

const Dashboard = () => {
  return (
    <Box sx={{ mb: 4, px: 1 }}>
      <Grid container spacing={2}>
        {STATS.map((stat) => (
          <Grid key={stat.label} item xs={12} md={4}>
            <StatCard stat={stat} />
          </Grid>
        ))}
      </Grid>
      <Card sx={{ my: 4, pt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2
            }}
          >
            <Typography variant='h4' component='span' color='text.primary'>
              Income
            </Typography>
          </Box>
          <IncomeChart />
      </Card>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TopUsers />
        </Grid>
        <Grid item xs={12} md={6}>
          <PopularProducts />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
