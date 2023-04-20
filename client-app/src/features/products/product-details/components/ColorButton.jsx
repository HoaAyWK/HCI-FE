import React from 'react';
import { Stack, Box, Typography } from '@mui/material';

import { StyledBox, StyledCard, StyledSelected } from './styles';
import { Iconify } from '../../../../components';

const ColorButton = ({ colorItem, select }) => {
  return (
    <StyledBox
      component='button'
      sx={{
        backgroundColor: (theme) => theme.palette.background.default,
        border: 'none',
        cursor: 'pointer'
      }}
    >
      <StyledCard className={select ? 'active' : ''}>
        <StyledSelected className='check'>
          <Iconify icon='material-symbols:check' width={16} height={16} />
        </StyledSelected>
        <Stack spacing={1} direction='row' alignItems='center'>
          <Box
            component='img'
            src={colorItem.image}
            alt='image'
            sx={{
              width: 48,
              height: 48,
              objectFit: 'cover',
              borderRadius: 1
            }}
          />
          <Stack spacing={0.5}>
            <Typography variant='body2' color='text.primary' textAlign='center'>
              {colorItem.color}
            </Typography>
            <Typography variant='body2' color='text.secondary' textAlign='center'>
              ${colorItem.price}
            </Typography>
          </Stack>
        </Stack>
      </StyledCard>
    </StyledBox>
  );
};

export default ColorButton;
