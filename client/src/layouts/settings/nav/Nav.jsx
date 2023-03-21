import React from 'react';
import { useLocation } from 'react-router-dom';
import { Avatar, Box, Button, Link, Stack, Typography } from '@mui/material';

import { NavSection } from '../../../components';
import { StyledAccount } from './styles';
import navConfig from './config';

const Nav = () => {
  const { pathname } = useLocation();

  return (
    <Box
      component='nav'
      sx={{
        flexShrink: { lg: 0 },
        width: '100%'
      }}
    >
      <Box
        sx={{ mb: 5, mx: 2.5 }}
      >
        <Link underline='none'>
          <StyledAccount>
            <Avatar />

            <Box sx={{ ml: 2 }}>
              <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                Sioay Here
              </Typography>

              <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                Admin
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>

      <NavSection data={navConfig} />
    </Box>
  );
};

export default Nav;
