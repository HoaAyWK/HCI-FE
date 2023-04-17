import React from 'react';
import { Box } from '@mui/material';

const MainBannerSlide = ({ image }) => {
  return (
    <Box
      component='span'
      sx={{
        width: '100%',
        lineHeight: 1,
        display: 'block',
        overflow: 'hidden',
        borderRadius: 1,
      }}
    >
      <Box
        component='img'
        sx={{
          width: '100%',
          maxHeight: 400,
          display: 'inline-block',
          objectFit: 'cover',
          borderRadius: 1
        }}
        src={image}
        alt='Product Image'
        loading='lazy'
      />
    </Box>
  );
};

export default MainBannerSlide;
