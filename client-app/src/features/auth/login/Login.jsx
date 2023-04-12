import React from 'react';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { unwrapResult } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from './components';
import { AuthFooter } from '../components';
import { AuthLayout } from '../layouts';
import { login } from '../authSlice';
import { Page } from '../../../components';

const Login = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { loginStatus } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const submit = async (data) => {
    try {
      const actionResult = await dispatch(login(data));
      const result = unwrapResult(actionResult);

      if (result.success) {
        enqueueSnackbar('Login successfully', { variant: 'success' });
        navigate('/');
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }

  return (
    <AuthLayout>
      <Page title='Login'>
        <Typography variant='h3' component='h1' align='center'>
          Log in to HCI
        </Typography>
        <LoginForm submit={submit} status={loginStatus} />
        <AuthFooter action='sign in to' />
      </Page>
    </AuthLayout>
  );
};

export default Login;
