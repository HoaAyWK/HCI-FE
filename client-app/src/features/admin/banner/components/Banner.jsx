import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, IconButton, Tooltip } from '@mui/material';

import { Iconify } from '../../../../components';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.grey[900], 0.32),
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: alpha(theme.palette.grey[900], 0.64)
  },
}));

const Banner = ({ image, height }) => {
  return (
    <Box
      sx={{
        position: 'relative'
      }}
    >
      <Box
        component='img'
        src={image}
        alt='image'
        sx={{
          width: '100%',
          height: `${height ? height : '100%'}`,
          objectFit: 'cover',
          borderRadius: 1,
        }}

      />
      <Tooltip title='Delete' sx={{ position: 'absolute', top: 6, right: 6 }}>
        <StyledIconButton size='small'>
          <Iconify icon='material-symbols:close-rounded' width={20} height={20} />
        </StyledIconButton>
      </Tooltip>
    </Box>
  );
};

export default Banner;
