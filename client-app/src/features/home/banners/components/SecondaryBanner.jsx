import React from 'react';
import { Box } from '@mui/material';

const SecondaryBanner = ({ image }) => {
  return (
    <Box
      component='img'
      src={image}
      alt='image'
      sx={{
        maxHeight: 120,
        objectFit: 'cover',
        width: '100%',
        borderRadius: 1,
      }}
      loading='lazy'
    />
  );
};

export default SecondaryBanner;
