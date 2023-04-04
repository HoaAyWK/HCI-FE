import React from 'react';
import { Box, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';

import LineItemTable from './components/LineItemTable';
import { Iconify, Label } from '../../components';

const OrderDetails = () => {

  return (
    <Box>
      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alginItems: 'start',
              mb: 4
            }}
          >
            <Typography variant='h6' component='h1' sx={{ mb: 2 }}>
              Order Details
            </Typography>
            <Stack spacing={1}>
              <Label color='primary'>Paid</Label>
              <Typography variant='subtitle1'>#12988</Typography>
            </Stack>
          </Box>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={0.5}>
                <Typography variant='subtitle1' color='text.secondary' textTransform='uppercase'>
                  Order Date
                </Typography>
                <Typography variant='body2' color='text.primary'>02/04/2023 09:41 AM</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={0.5}>
                <Typography variant='subtitle1' color='text.secondary' textTransform='uppercase'>
                  To
                </Typography>
                <Typography variant='body2' color='text.primary'>Lucas Steve</Typography>
                <Typography variant='body2' color='text.primary'>0192321882</Typography>
                <Typography variant='body2' color='text.primary'>36901 Elmer Spurs Apt. 762 - Miramar, DE / 92836</Typography>
              </Stack>
            </Grid>
          </Grid>
          <LineItemTable />
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}
          >
            <Stack spacing={2} direction='row'>
              <Typography variant='subtitle1'>Total</Typography>
              <Typography variant='subtitle1'>$2498</Typography>
            </Stack>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Stack spacing={2}>
            <Typography variant='subtitle1' color='text.secondary' textTransform='uppercase'>
              Payment method
            </Typography>
            <Stack spacing={1} direction='row' alignItems='center'>
              <Iconify icon='ph:money' width={24} height={24} />
              <Typography variant='body1'>Cash</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderDetails;
