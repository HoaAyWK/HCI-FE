import React, { useEffect } from 'react';
import { Box, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import LineItemTable from './components/LineItemTable';
import { Iconify, Label, Loading } from '../../components';
import { getSingleBill } from '../common/orderSlice';
import ACTION_STATUS from '../../constants/actionStatus';
import { fDateTime } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';

const OrderDetails = ({ id }) => {
  const dispatch = useDispatch();
  const { getSingleBillStatus, bill } = useSelector((state) => state.orders);
  const { createReviewStatus } = useSelector((state) => state.productReviews);

  useEffect(() => {
    dispatch(getSingleBill(id));
  }, [id]);

  useEffect(() => {
    if (createReviewStatus === ACTION_STATUS.SUCCEEDED) {
      dispatch(getSingleBill(id));
      dispatch(refresh());
    }
  }, [createReviewStatus]);

  if (getSingleBillStatus === ACTION_STATUS.IDLE ||
      getSingleBillStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getSingleBillStatus === ACTION_STATUS.FAILED) {
    return <Navigate to='/' />;
  }

  return (
    <Box sx={{ pt: 2 }}>
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
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
                <Label color='primary'>{bill.status}</Label>
              </Box>
              <Typography variant='subtitle1'>ID: {bill.id}</Typography>
            </Box>
          </Box>

          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Stack spacing={0.5}>
                <Typography variant='subtitle1' color='text.secondary' textTransform='uppercase'>
                  Order Date
                </Typography>
                <Typography variant='body2' color='text.primary'>{fDateTime(bill.orderDate)}</Typography>
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
          <LineItemTable items={bill.orderItems} />
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}
          >
            <Stack spacing={2} direction='row'>
              <Typography variant='subtitle1'>Total</Typography>
              <Typography variant='subtitle1'>{fCurrency(bill.price)}</Typography>
            </Stack>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Stack spacing={2}>
            <Typography variant='subtitle1' color='text.secondary' textTransform='uppercase'>
              Payment method
            </Typography>
            <Stack spacing={1} direction='row' alignItems='center'>
              <Iconify icon='ph:money' width={24} height={24} />
              <Typography variant='body1' textTransform='capitalize'>{bill.paymentType}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderDetails;
