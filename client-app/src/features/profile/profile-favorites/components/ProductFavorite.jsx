import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

import { Iconify } from '../../../../components';

const ProductFavorite = ({ product }) => {
  const { name, image, numOfFavorites } = product;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Stack spacing={1} direction='row'>
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
          <Typography variant='subtitle1'>{name}</Typography>
          <Stack spacing={3} direction='row'>
            <Stack spacing={1} direction='row'>
              <Iconify icon='mdi:cards-heart' width={20} height={20} sx={{ color: 'text.secondary' }} />
              <Typography variant='body2' color='text.secondary'>{numOfFavorites}</Typography>
            </Stack>
            <Typography variant='body2' color='text.secondary'>Favorited 2 months ago</Typography>
          </Stack>
        </Stack>
      </Stack>
      <Button variant='outlined' color='inherit' size='small'>
        <Iconify icon='mdi:cards-heart' width={20} height={20} color='#ff4842' />
        &nbsp;
        &nbsp;
        <Typography variant='button'>Favorited</Typography>
      </Button>
    </Box>
  );
};

export default ProductFavorite;
