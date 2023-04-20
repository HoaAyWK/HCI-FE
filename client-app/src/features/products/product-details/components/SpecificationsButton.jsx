import React from 'react';
import { Stack, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { Iconify } from '../../../../components';
import { StyledBox, StyledCard, StyledSelected } from './styles';

const SpecificationsButton = ({ variant, select }) => {
  return (
    <Link component={RouterLink} to='#' underline='none'>
      <StyledBox >
        <StyledCard className={select ? 'active' : ''}>
          <StyledSelected className='check'>
            <Iconify icon='material-symbols:check' width={16} height={16} />
          </StyledSelected>
          <Stack spacing={0.5}>
            <Typography variant='body2' color='text.primary' textAlign='center'>
              {variant.specifications}
            </Typography>
            <Typography variant='body2' color='text.secondary' textAlign='center'>
              ${variant.price - variant.discount}
            </Typography>
          </Stack>
        </StyledCard>
      </StyledBox>
    </Link>
  );
};

export default SpecificationsButton;
