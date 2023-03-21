import React, { useState } from 'react';
import { Box, Link, Stack, Typography, InputAdornment, IconButton } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormProvider, RHFTextField } from '../../../../components/hook-form';
import { Iconify } from '../../../../components';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const defaultValues = {
    email: '',
    password: ''
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Box
      sx={{ width: '100%' }}
    >
      <Typography variant='body1' align='center' sx={{ my: 2 }}>
        Enter your email address and password.
      </Typography>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <RHFTextField name='email' label='Email' />
          <RHFTextField
            name='password'
            type={showPassword ? 'text' : 'password' }
            label='Password'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Stack>
        <Box sx={{ mt: 1 }}>
          <Link component={RouterLink} to='/forgot-password' color='text.primary' sx={{ textAlign: 'center' }}>
            <Typography variant='body2'>
              Forgot your password?
            </Typography>
          </Link>
        </Box>
        <Box sx={{ my: 3 }}>
          <LoadingButton fullWidth variant='contained'>
            Log in
          </LoadingButton>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', alginItems: 'center' }}>
          <Typography variant='body2' component='span'>Don't have an account yet?</Typography>
          &nbsp;
          <Link component={RouterLink} to='/sign-up' color='text.primary'>
            <Typography variant='body2' component='span'>
              Sign up
            </Typography>
          </Link>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default LoginForm;
