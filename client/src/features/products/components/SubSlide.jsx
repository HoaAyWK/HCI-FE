import React from 'react';
import { Box } from '@mui/material';

const SubSlide = ({ image }) => {

  return (
    <Box
      sx={{
        px: 1,
        display: 'block'
      }}
    >
      <Box
        component='span'
        sx={{
          lineHeight: 1,
          display: 'block',
          overflow: 'hidden',
          position: 'relative',
          width: 64,
          height: 64,
          borderRadius: '12px',
          cursor: 'pointer',
        }}
      >
        <Box
          component='span'
          sx={{
            width: '100%',
            height: '100%',
            display: 'block',
            backgroundSize: 'cover'
          }}
        >
          <Box
            component='img'
            sx={{
              width: '100%',
              height: '100%',
              display: 'inline-block',
              objectFit: 'cover'
            }}
            src={image}
            alt='thumbnail'
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SubSlide;
