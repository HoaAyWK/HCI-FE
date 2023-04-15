import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, CardContent, Grid, InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';

import { ImagesUploader } from './components';
import ACTION_STATUS from '../../../constants/actionStatus';
import { FormProvider, RHFEditor, RHFSelect, RHFTextField } from '../../../components/hook-form';

const colors = [
  { id: 1, name: 'Grey' },
  { id: 2, name: 'Blue' },
  { id: 3, name: 'Green' },
  {id: 4, name: 'Red'},
  { id: 5, name: 'Black'}
];

const statuses = [
  { id: 1, name: 'Available'},
  { id: 2, name: 'Out of stock' }
];


const PRODUCT_ORIGINS = [
  {
    id: '1',
    name: 'MacBook Air M1 2020'
  },
  {
    id: '2',
    name: 'ThinkPad X1 Carbon',
  },
  {
    id: '3',
    name: 'MacBook Pro M2 2022'
  }
];


const ProductVariantForm = ({ isEdit, product, action, status }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const ProductSchema = Yup.object().shape({
    id: Yup.string(),
    productId: Yup.string(),
    specification: Yup.string()
      .required('Specification is required'),
    status: Yup.string(),
    color: Yup.string(),
    price: Yup.number()
      .required('Price is required'),
      images: Yup.array().required('Images is required')
  });

  const defaultValues = product ? product : {
    id: '',
    productId: PRODUCT_ORIGINS[0].id,
    color: '1',
    specification: '',
    status: statuses[0].id,
    price: 0,
    images: []
  };

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues
  });

  const { handleSubmit, setValue } = methods;

  const onSubmit = async (data) => {
    console.log(data);

    // try {
    //   const actionResult = action(data);
    //   const result = unwrapResult(actionResult);

    //   if (result) {
    //     enqueueSnackbar(`${isEdit ? 'Updated' : 'Created'} successfully`, { variant: 'success' });
    //     dispatch(refresh());
    //   }
    // } catch (error) {
    //   enqueueSnackbar(error.message, { variant: 'error' });
    // }
  };

  const handleSelectProductOriginChange = (event) => {
    setValue('productId', event.target.value);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 1 }}>
            <CardContent>
              <RHFTextField name='id' type='hidden' sx={{ display: 'none' }} />
              <Stack spacing={2}>
                <RHFTextField name='productId' label='Product Origin Id' disabled />
                <TextField
                  id='select-product-origin'
                  select
                  label='Product Origin'
                  defaultValue={PRODUCT_ORIGINS[0].id}
                  onChange={handleSelectProductOriginChange}
                >
                  {PRODUCT_ORIGINS.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name}
                    </MenuItem>
                  ))}
                </TextField>
                <RHFTextField name='specification' multiline minRows={3} label='Specification' placeholder='Write specification...' />
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: 1, mt: 4 }}>
            <CardContent>
              <ImagesUploader name='images' />
            </CardContent>
          </Card>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              type='submit'
              variant='contained'
              color='primary'
              loading={status === ACTION_STATUS.LOADING ? true : false}
            >
              {`${isEdit ? 'Update' : 'Create'} Product Variant`}
            </LoadingButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 1 }}>
            <CardContent>
              <Stack spacing={2}>
                <RHFSelect
                  name='status'
                  data={statuses}
                  id='status'
                  label='Status'
                />
                <RHFSelect
                  name='color'
                  data={colors}
                  id='color'
                  label='Color'
                />
                <RHFTextField
                  name='price'
                  placeholder='0'
                  label='Price'
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default ProductVariantForm;
``
