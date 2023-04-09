import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, CardContent, Grid, InputAdornment, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { ImagesUploader } from './components';
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

const brands = [
  {
    id: 1,
    name: 'Samsung'
  },
  {
    id: 2,
    name: 'Apple'
  },
  {
    id: 3,
    name: 'Lenovo'
  }
];

const categories = [
  {
    id: 1,
    name: 'Laptop'
  },
  {
    id: 2,
    name: 'Smartphone'
  },
  {
    id: 3,
    name: 'Components'
  }
];

const ProductForm = () => {

  const ProductSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    description: Yup.string()
      .required('Description is required'),
    specification: Yup.string()
      .required('Specification is required'),
    status: Yup.string(),
    category: Yup.string(),
    brand: Yup.string(),
    color: Yup.string(),
    price: Yup.string()
      .required('Price is required'),
      images: Yup.array().required('Images is required')
  });

  const defaultValues = {
    name: '',
    description: '',
    specification: '',
    status: statuses[0].id,
    category: categories[0].id,
    brand: brands[0].id,
    color: colors[0].id,
    price: '0',
    images: []
  };

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };



  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 1 }}>
            <CardContent>
              <Stack spacing={2}>
                <RHFTextField name='name' label='Name' />
                <RHFEditor name='description' label='Description' initialContent={'<p>hello world</p>\n'} />
                <RHFEditor name='specification' label='Specification' initialContent={'<p>A greate product</p>\n'} />
              </Stack>
            </CardContent>
          </Card>
          <Card sx={{ borderRadius: 1, mt: 4 }}>
            <CardContent>
              <ImagesUploader name='images' />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 1 }}>
            <CardContent>
              <Stack spacing={2}>
                <RHFSelect
                  name='category'
                  data={categories}
                  id='category'
                  label='Category'
                />
                <RHFSelect
                  name='brand'
                  data={brands}
                  id='brand'
                  label='Brand'
                />
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
          <Box sx={{ mt: 3 }}>
            <LoadingButton type='submit' variant='contained' color='primary' fullWidth>Create Product</LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default ProductForm;
