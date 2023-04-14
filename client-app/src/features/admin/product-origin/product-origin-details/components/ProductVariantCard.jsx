import React from 'react';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { Label } from '../../../../../components';

const ProductVariantCard = ({ variant }) => {
  const { image, color, specification, price, discount, status } = variant;
  return (
    <Card sx={{ borderRadius: 1, p: 2, border: (theme) => `1px dashed ${theme.palette.divider}`, boxShadow: 'none' }}>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <Box
        component='img'
        src={image}
        alt='image'
        sx={{
          width: 76,
          height: 76,
          objectFit: 'cover',
          borderRadius: 1
        }}
        loading='lazy'
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Stack spacing={0.5}>
        <Typography variant='h6' component='span' color='error' textAlign='center'>
          ${price - discount}
        </Typography>
        <Typography variant='body2' color='text.secondary' textAlign='center'>
          <s>${price}</s>
        </Typography>
        </Stack>
      </Box>
    </Box>
    <Stack spacing={0.5} sx={{ mt: 2 }}>
      <Typography variant='body1' color='text.secondary'>
        Color:
        &nbsp;
        <Typography variant='body1' component='span' color='text.primary'>
          {color}
        </Typography>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alginItems: 'center'
        }}
      >
        <Typography variant='body1' color='text.secondary'>
          Status: &nbsp;
        </Typography>
        <Label color={status ? 'success' : 'error'}>{status ? 'Available' : 'Out of stock'}</Label>
      </Box>
      <Typography variant='body1' color='text.secondary'>
        Specification:
        &nbsp;
        <Typography variant='body1' component='span' color='text.primary'>
          {specification}
        </Typography>
      </Typography>
    </Stack>
    </Card>
  );
};

export default ProductVariantCard;
