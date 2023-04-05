import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, CardContent, Grid, Switch, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { FormProvider, RHFDateTextField, RHFRadioGroup, RHFTextField } from '../../../components/hook-form';
import { AvatarUploader } from '../../../components';

const genders = ['Male', 'Female'];

const UserForm = ({  isEdit, defaultUser }) => {
  const [emailVerified, setEmailVerified] = useState(false);

  const UserSchema = Yup.object().shape({
    firstName: Yup.string()
      .required('First Name is required'),
    lastName: Yup.string()
      .required('Last Name is required'),
    email: Yup.string()
      .email('Email must be a valid email address')
      .required('Email is required'),
    phone: Yup.string()
      .required('Phone is required'),
    gender: Yup.string()
      .required('Gender is required'),
    dateOfBirth: Yup.string()
      .required('Date of birth is required'),
    address: Yup.string()
      .required('Address is required'),
    avatar: Yup.mixed(),
  });

  const defaultValues = defaultUser ? defaultUser : {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: genders[0],
    dateOfBirth: '',
    avatar: '',
    emailVerified: false
  };

  const methods = useForm({
    resolver: yupResolver(UserSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    const formData = { ...data, emailVerified };
    console.log(formData);
  };

  const handleSwitchChange = (event) => {
    setEmailVerified(event.target.checked);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 1 }}>
            <CardContent>
              <Box
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <AvatarUploader name='avatar' />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mt: 3
                }}
              >
                <Typography variant='subtitle1'>
                  Email Verified
                </Typography>
                <Switch
                  checked={emailVerified}
                  inputProps={{ 'aria-lael': 'switch email verified' }}
                  onChange={handleSwitchChange}

                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 1 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <RHFTextField name='firstName' label='First Name' />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField name='lastName' label='Last Name' />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField name='email' label='Email' />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFTextField name='phone' label='Phone' />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFDateTextField name='dateOfBirht' label='Date Of Birth' />
                </Grid>
                <Grid item xs={12} md={6}>
                  <RHFRadioGroup name='gender' id='radios-gender' label='Gender' items={genders} row  />
                </Grid>
                <Grid item xs={12}>
                  <RHFTextField name='address' label='Address' multiline minRows={3} />
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  mt: 3
                }}
              >
                <LoadingButton type='submit' variant='contained'>
                  {isEdit ? 'Update' : 'Create'}
                </LoadingButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default UserForm;
