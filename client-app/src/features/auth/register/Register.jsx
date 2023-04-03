import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

import { AuthLayout } from '../layouts';
import { AuthFooter } from '../components';
import { register } from '../authSlice';
import MultiStepsRegisterForm from './components/MultiStepsRegisterForm';


const Register = () => {
  const dispatch = useDispatch();
  const { registerStatus } = useSelector(state => state.auth);
  const { enqueueSnackbar } = useSnackbar();

  const submit = async (data) => {
    try {
      const actionResult = await dispatch(register(data));
      const result = unwrapResult(actionResult);

      if (result.success) {
        enqueueSnackbar('Register successfully', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }

  return (
    <AuthLayout>
      <Typography variant='h3' component='h1' align='center'>
        Create a new account
      </Typography>
      <MultiStepsRegisterForm submit={submit} status={registerStatus} />
      <AuthFooter action='sign up for' />
    </AuthLayout>
  );
};

export default Register;