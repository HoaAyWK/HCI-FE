import React from 'react';
import { Box, Typography, Divider, Stack, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormProvider, RHFTextField } from '../../components/hook-form';

const PasswordSettings = () => {
  const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required'),
    newPassword: Yup.string()
      .required('New Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Confirm Password must match New Password')
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  const methods = useForm({
    resolver: yupResolver(ChangePasswordSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant='h6' component='h1'>
        Change password
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item xs={12} sm={7}>
              <Stack spacing={2}>
                <RHFTextField name='oldPassword' label='Old Password' />
                <RHFTextField name='newPassword' label='New Password' />
                <RHFTextField name='confirmPassword' label='Confirm Password' />
              </Stack>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <Typography variant='caption' color='text.secondary' component='div' sx={{ mb: 0.5 }} >
                Make sure it's at least 15 characters OR at least 8 characters including a number and a lowercase letter.
              </Typography>
              <LoadingButton variant='outlined'>Update Password</LoadingButton>
            </Box>
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default PasswordSettings;
