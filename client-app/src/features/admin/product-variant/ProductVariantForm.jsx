import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, CardContent, Grid, InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

import { ImagesUploader } from './components';
import ACTION_STATUS from '../../../constants/actionStatus';
import { FormProvider, RHFEditor, RHFMultiSelect, RHFSelect, RHFTextField } from '../../../components/hook-form';
import { COLOR } from '../../../constants/colors';
import { getProductOrigins, selectAllProductOrigins } from '../product-origin/productOriginSlice';
import { FetchDataErrorMessage, Loading } from '../components';

const colors = [
  { id: COLOR.NONE, name: 'None' },
  { id: COLOR.WHITE, name: 'White' },
  { id: COLOR.BLACK, name: 'Black' },
  { id: COLOR.GOLD, name: 'Gold '},
  { id: COLOR.RED, name: 'Red' },
  { id: COLOR.BLUE, name: 'Blue' },
  { id: COLOR.GREEN, name: 'Green' },
  { id: COLOR.SILVER, name: 'Silver' },
  { id: COLOR.YELLOW, name: 'Yellow' },
  { id: COLOR.VOILET, name: 'Violet' },
  { id: COLOR.PINK, name: 'Pink' }
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

const IMAGES = [
  'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80',
];

const ProductVariantForm = ({ isEdit, product, action, status }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [colorItems, setColorItems] = useState([]);
  const products = useSelector(selectAllProductOrigins);
  const { getProductOriginsStatus } = useSelector((state) => state.adminProductOrigins);

  useEffect(() => {
    if (getProductOriginsStatus === ACTION_STATUS.IDLE) {
      dispatch(getProductOrigins());
    }
  }, []);

  const ProductSchema = Yup.object().shape({
    id: Yup.string(),
    productId: Yup.string(),
    specification: Yup.string()
      .required('Specification is required'),
    status: Yup.string(),
    color: Yup.array()
      .min(1, 'Color is required'),
    price: Yup.number()
      .required('Price is required')
      .moreThan(0, 'Price must be more than 0'),
    images: Yup.array()
      .required('Images is required')
      .min(1, `Images is required`)
  });

  const defaultValues = product ? product : {
    id: '',
    productId: PRODUCT_ORIGINS[0].id,
    color: [],
    specification: '',
    status: statuses[0].id,
    price: 0,
    images: []
  };

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues
  });

  const { handleSubmit, setValue, getValues, clearErrors } = methods;

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

  const handleColorItemsChange = (items) => {
    setColorItems(items);
  };

  const handleSelectProductOriginChange = (event) => {
    setValue('productId', event.target.value);
  };

  if (getProductOriginsStatus === ACTION_STATUS.IDLE ||
      getProductOriginsStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getProductOriginsStatus === ACTION_STATUS.FAILED) {
    return <FetchDataErrorMessage />;
  }

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
                  defaultValue={product?.[0]?.id}
                  onChange={handleSelectProductOriginChange}
                >
                  {products?.map((product) => (
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
              <ImagesUploader name='images' getValues={getValues} setValue={setValue} clearErrors={clearErrors} />
            </CardContent>
          </Card>
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
                <RHFMultiSelect
                  name='color'
                  data={colors}
                  id='color'
                  label='Color'
                  defaultValue={[]}
                  items={colorItems}
                  onItemsChange={handleColorItemsChange}
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
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
      </Grid>
    </FormProvider>
  );
};

export default ProductVariantForm;
