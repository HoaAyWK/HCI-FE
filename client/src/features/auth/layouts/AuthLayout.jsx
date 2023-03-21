import React from 'react';
import { Box, Container, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100%', overflow: 'hidden' }}>
      <Container maxWidth='xs' sx={{ minHeight: '100%' }}>
        <Box
          sx={{
            mt: 8, display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 4
            }}
        >
          <Link component={RouterLink} to='/' underline='none' color='text.primary'>
            <Typography variant='h1'>LOGO</Typography>
          </Link>
        </Box>
        {children}
      </Container>
    </Box>
  );
};

export default AuthLayout;
