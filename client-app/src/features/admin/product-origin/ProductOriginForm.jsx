import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, CardContent, Grid, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

import ACTION_STATUS from '../../../constants/actionStatus';
import { FormProvider, RHFEditor, RHFSelect, RHFTextField } from '../../../components/hook-form';
import { refresh } from './productOriginSlice';
import { getCategories, selectAllCategories } from '../category/categorySlice';
import { Loading } from '../../../components';

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


const ProductOriginForm = ({ isEdit, product, action, status }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const categories = useSelector(selectAllCategories);
  const { getCategoriesStatus } = useSelector((state) => state.adminCategories);

  useEffect(() => {
    if (getCategoriesStatus === ACTION_STATUS.IDLE) {
      dispatch(getCategories());
    }
  }, []);

  const ProductSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    description: Yup.string()
      .required('Description is required'),
    information: Yup.string()
      .required('Specification is required'),
    category: Yup.string(),
    brand: Yup.string(),
  });

  const defaultValues = product ? product : {
    name: '',
    description: '',
    information: '',
    category: categories?.[0]?.id,
    brand: brands[0].id,
  };

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const actionResult = await dispatch(action(data));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar(`${isEdit ? 'Updated' : 'Created'} successfully`, { variant: 'success' });
        reset();
        dispatch(refresh());
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  if (getCategoriesStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 1 }}>
            <CardContent>
              <Stack spacing={2}>
                <RHFTextField name='name' label='Name' />
                <RHFEditor name='description' label='Description' initialContent={'<p>Hello world</p>\n'} />
                <RHFEditor name='information' label='Information' initialContent={''} />
              </Stack>
            </CardContent>
          </Card>
          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton
              type='submit'
              variant='contained'
              color='primary'
              size='large'
              loading={status === ACTION_STATUS.LOADING ? true : false}
            >
              {`${isEdit ? 'Update' : 'Create'} product origin`}
            </LoadingButton>
          </Box>
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
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default ProductOriginForm;
