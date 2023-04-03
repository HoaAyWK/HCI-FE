import React, { useMemo } from 'react';
import { Box, Button, Divider, Typography, Stack } from '@mui/material';

import ProductItem from './ProductItem';
import { Label } from '../../../../components';
import { STATUS } from '../../../../constants/orderStatus';

const Order = ({ order }) => {
  const { id, createdDate, status, items } = order;

  const labelColor = (status) => {
    if (status === STATUS.PAID) {
      return 'primary';
    } else if (status === STATUS.PROCESSING) {
      return 'warning';
    } else if (status === STATUS.DELIVERED) {
      return 'success';
    } return 'error';
  };

  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => (item.price * item.quantity) + total, 0);
  }, [items]);

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
            Order Date: {createdDate}
          </Typography>
        </Stack>
        <Label color={labelColor(status)}>{status}</Label>
      </Box>
      <Box sx={{ mt: 1, mb: 3, borderBottom: `1px dashed`, borderColor: 'divider' }} />
      <Stack spacing={2}>
        {items.map((item) => (
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
        <Typography variant='h6' component='span' color='error'>${totalPrice}</Typography>
      </Box>
      <Box
        sx={{
          mt: 2,
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Stack spacing={2}>
          <Button color='inherit' variant='outlined'>Details</Button>
          {status === STATUS.PROCESSING && (
            <Button color='error' variant='outlined'>Cancel</Button>
          )}
        </Stack>
      </Box>
    </Box>
  );
};

export default Order;
