import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Typography, Stack } from '@mui/material';

import ProductItem from './ProductItem';
import { Label } from '../../../../components';
import { STATUS } from '../../../../constants/orderStatus';
import { fCurrency } from '../../../../utils/formatNumber';
import { fDateTime } from '../../../../utils/formatTime';

const Order = ({ order }) => {
  const { id, orderDate, status, price, paymentType, orderItems } = order;

  const labelColor = (status) => {
    if (status === STATUS.PAID) {
      return 'primary';
    } else if (status === STATUS.PROCESSING) {
      return 'warning';
    } else if (status === STATUS.DELIVERED) {
      return 'success';
    } return 'error';
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Stack spacing={1}>
          <Typography variant='body1'>
            Order ID: {id}
          </Typography>
          <Typography variant='body1'>
            Order Date: {fDateTime(orderDate)}
          </Typography>
        </Stack>
        <Label color={labelColor(status)}>{status}</Label>
      </Box>
      <Box sx={{ mt: 1, mb: 3, borderBottom: `1px dashed`, borderColor: 'divider' }} />
      <Stack spacing={2}>
        {orderItems.map((item) => (
          <ProductItem key={item.id} item={item} />
        ))}
      </Stack>
      <Box sx={{ my: 2, borderBottom: `1px dashed`, borderColor: 'divider' }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
        <Typography variant='body1'>Total</Typography>
        <Typography variant='h6' component='span' color='error'>{fCurrency(price)}</Typography>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Stack spacing={2}>
          <Button LinkComponent={RouterLink} to='/orders/12099' color='inherit' variant='outlined'>Details</Button>
          {status === STATUS.PROCESSING && (
            <Button color='error' variant='outlined'>Cancel</Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Order;
