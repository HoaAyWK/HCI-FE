import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, CardContent, Grid, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';

import ACTION_STATUS from '../../../constants/actionStatus';
import { FormProvider, RHFEditor, RHFSelect, RHFMultiSelect, RHFTextField } from '../../../components/hook-form';
import { refresh } from './productOriginSlice';
import { getCategories, selectAllCategories } from '../category/categorySlice';
import { FetchDataErrorMessage, Loading } from '../components';
import { getBrands, selectAllBrands } from '../brand/brandSlice';


const ProductOriginForm = ({ isEdit, product, action, status }) => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const categories = useSelector(selectAllCategories);
  const brands = useSelector(selectAllBrands);
  const { getCategoriesStatus } = useSelector((state) => state.adminCategories);
  const { getBrandsStatus } = useSelector((state) => state.adminBrands);
  const [categoryItems, setCategoryItems] = useState([]);
  const [initialDescription, setInitialDescription] = useState('<p>Hello world</p>\n');
  const [initialInformation, setInitialInformation] = useState('<p>Information</p>\n');

  useEffect(() => {
    if (getCategoriesStatus === ACTION_STATUS.IDLE) {
      dispatch(getCategories());
    }

    if (getBrandsStatus === ACTION_STATUS.IDLE) {
      dispatch(getBrands());
    }
  }, []);

  const ProductSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    description: Yup.string()
      .required('Description is required'),
    information: Yup.string()
      .required('Specification is required'),
    category: Yup.array()
      .required('Category is required')
      .min(1, 'Category is required'),
    brand: Yup.string()
      .required('Brand is required'),
  });

  const defaultValues = product ? product : {
    name: '',
    description: '',
    information: '',
    category: [],
    brand: brands?.[0]?.id,
  };

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const handleCategoryItemsChange = (items) => {
    setCategoryItems(items);
  };

  const onSubmit = async (data) => {
    try {
      const actionResult = await dispatch(action(data));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar(`${isEdit ? 'Updated' : 'Created'} successfully`, { variant: 'success' });
        reset();
        dispatch(refresh());
        setCategoryItems([]);
        setInitialDescription('<p>Hello world</p>\n');
        setInitialInformation('<p>Information</p>\n');
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  if (getCategoriesStatus === ACTION_STATUS.LOADING ||
      getCategoriesStatus === ACTION_STATUS.IDLE ||
      getBrandsStatus === ACTION_STATUS.LOADING ||
      getBrandsStatus === ACTION_STATUS.IDLE) {
    return <Loading />;
  }

  if (getCategories === ACTION_STATUS.FAILED || getBrandsStatus === ACTION_STATUS.FAILED) {
    return <FetchDataErrorMessage />;
  }

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 1 }}>
            <CardContent>
              <Stack spacing={2}>
                <RHFTextField name='name' label='Name' />
                <RHFEditor name='description' label='Description' initialContent={initialDescription} />
                <RHFEditor name='information' label='Information' initialContent={initialInformation} />
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 1 }}>
            <CardContent>
              <Stack spacing={2}>
                <RHFMultiSelect
                  name='category'
                  data={categories}
                  id='category'
                  label='Category'
                  items={categoryItems}
                  onItemsChange={handleCategoryItemsChange}
                  defaultValue={[]}
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
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
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
      </Grid>
    </FormProvider>
  );
};

export default ProductOriginForm;
