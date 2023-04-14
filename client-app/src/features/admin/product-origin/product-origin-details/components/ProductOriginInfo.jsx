import React from 'react';
import { Stack, Typography } from '@mui/material';

const ProductOriginInfo = ({ label, content }) => {
  return (
    <Stack spacing={0.5}>
      <Typography variant='body2' color='text.secondary'>
        {label}
      </Typography>
      <Typography variant='body1' color='text.primary'>
        {content}
      </Typography>
    </Stack>
  );
};

export default ProductOriginInfo;
