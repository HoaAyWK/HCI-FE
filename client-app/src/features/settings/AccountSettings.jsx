import React from 'react';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormProvider, RHFTextField } from '../../components/hook-form';
import { AvatarUploader } from '../../components';

const AccountSettings = () => {
  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phone: Yup.string().required('Last Name is required'),
    address: Yup.string().required('Address is required'),
    bio: Yup.string(),
    image: Yup.mixed()
  });

  const defaultValues = {
    firstName: 'Sioay',
    lastName: 'Here',
    phone: '09128321399',
    address: 'TD, HCM city, Viet Nam',
    bio: '',
    image: ''
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant='h6' component='h1'>
        My Profile
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Box>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            sx={{
              flexDirection: {
                xs: 'column-reverse',
                md: 'row'
              }
            }}
          >
            <Grid item xs={12} md={8}>
              <Stack spacing={2}>
                <RHFTextField name='firstName' label='First Name' />
                <RHFTextField name='lastName' label='Last Name' />
                <RHFTextField name='phone' label='Phone' />
                <RHFTextField
                  name='bio'
                  label='Bio'
                  placeholder='Tell us a little bit about yourself'
                  multiline
                  minRows={3}
                />
                <RHFTextField multiline minRows={3} name='address' label='Address' />
              </Stack>
              <Box sx={{ mt: 2 }}>
                <LoadingButton color='primary' variant='contained'>Update Profile</LoadingButton>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant='body2' >Profile picture</Typography>
              <Box
                sx={{ marginBlock: 1 }}
              >
                <AvatarUploader name='image' />
              </Box>
            </Grid>
          </Grid>
        </FormProvider>
      </Box>
    </Box>
  );
};

export default AccountSettings;
