import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { Iconify } from '../../../../components';

const ProductItem = ({ item }) => {
  const { name, image, quantity, price } = item;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Stack spacing={1} direction='row' sx={{ minWidth: 250 }}>
        <Box
          component='img'
          src={image}
          alt={name}
          sx={{
            width: 56,
            height: 56,
            objectFit: 'cover',
            borderRadius: 1
          }}
        />
        <Stack spacing={0.5}>
          <Typography variant='subtitle1' color='text.primary'>{name}</Typography>
          <Stack spacing={1} direction='row'>
            <Iconify icon='fluent-mdl2:quantity' width={24} height={24} sx={{ color: 'text.secondary' }} />
            <Typography variant='body1' color='text.primary'>{quantity}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Typography variant='subtitle1' color='text.primary'>${price * quantity}</Typography>
    </Box>
  );
};

export default ProductItem;
