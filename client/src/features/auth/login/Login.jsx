import React from 'react';
import { Typography } from '@mui/material';

import { LoginForm } from './components';
import { AuthFooter } from '../components';
import { AuthLayout } from '../layouts';

const Login = () => {
  return (
    <AuthLayout>
      <Typography variant='h3' component='h1' align='center'>
        Log in to HCI
      </Typography>
      <LoginForm />
      <AuthFooter action='sign in to' />
    </AuthLayout>
  );
};

export default Login;
