import React from 'react';
import { styled } from '@mui/material/styles';
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';

import Iconify from '../iconify';

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const AppTableToolbar = ({ numSelected }) => {
  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'primary',
          backgroundColor: 'primary.lighter'
        })
      }}
    >
      <Typography variant='h6' component='span'>
        {`Cart (${numSelected} ${numSelected > 1 ? 'items selected' : 'item selected' })`}
      </Typography>
      <Tooltip title='Delete'>
        <IconButton>
          <Iconify icon='eva:trash-2-fill' />
        </IconButton>
      </Tooltip>
    </StyledRoot>
  );
};

export default AppTableToolbar;
