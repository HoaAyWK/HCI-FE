import React from 'react';

import { AuthLayout } from '../layouts';
import { AuthFooter } from '../components';
import { RegisterForm } from './components';
import { Typography } from '@mui/material';

const Register = () => {
  return (
    <AuthLayout>
      <Typography variant='h3' component='h1' align='center'>
        Create a new account
      </Typography>
      <RegisterForm />
      <AuthFooter action='sign up for' />
    </AuthLayout>
  );
};

export default Register;
