import React from 'react';
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormProvider, RHFDateTextField, RHFRadioGroup, RHFTextField } from '../../components/hook-form';
import { AvatarUploader } from '../../components';
import { useSelector } from 'react-redux';

const genders = ['Male', 'Female'];

const AccountSettings = () => {
  const { user } = useSelector((state) => state.auth);

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
    birthDate: Yup.string().required('Date of birth is required'),
    gender: Yup.string(),
    image: Yup.mixed()
  });

  const defaultValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone,
    address: user?.address,
    birthDate: user?.birthDate,
    gender: user?.gender === 'male' ? 'Male' : 'Female',
    image: user?.avatar ? user.avatar : ''
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
                <RHFDateTextField name='birthDate' label='Date of birth' />
                <RHFRadioGroup name='gender' id='gender-radios' label='Gender' items={genders} row />
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
