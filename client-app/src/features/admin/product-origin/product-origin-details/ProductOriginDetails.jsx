import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectProductOriginyById } from '../productOriginSlice';
import { useParams } from 'react-router-dom';

import { LabelAndContent } from '../../common/components';
import { ProductVariantCard } from './components';
import { Iconify } from '../../../../components';

const PRODUCT = {
  name: 'Macbook Air M1 2020',
  description: 'Laborum et nisi ea excepteur laboris exercitation consequat velit. Ipsum nostrud velit velit exercitation irure aliquip voluptate id aliqua irure excepteur et aute. Quis proident velit et cupidatat proident laboris. Cillum amet labore id enim officia elit voluptate ad tempor dolor ut incididunt. Non commodo officia et laboris Lorem magna ut mollit ex est fugiat. Eiusmod tempor ipsum et adipisicing id ad quis magna proident exercitation eu. Quis consectetur nisi exercitation in cupidatat id ea veniam excepteur ad.',
  information: 'Elit ipsum nulla dolore laboris ipsum cillum pariatur magna pariatur voluptate exercitation eu. Consequat nostrud pariatur Lorem cupidatat. Esse officia anim incididunt do tempor in voluptate eu reprehenderit magna. Cupidatat occaecat Lorem qui mollit esse enim elit laboris pariatur do minim. Labore dolor amet commodo ipsum non.',
  category: 'Laptop',
  brand: 'Apple'
};

const PRODUCT_VARIANTS = [
  { id: 1, color: 'Golden', status: true, specification: '8GB RAM, 256GB SSD', price: 1399, discount: 100, image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80', },
  { id: 2, color: 'Silver', status: true, specification: '16GB RAM', price: 1599, discount: 200, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80', },
  { id: 3, color: 'White', specification: '4GB RAM', price: 999, discount: 50, image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', },
  { id: 4, color: 'Black', status: true, specification: '8GB RAM', price: 1399, discount: 100, image: 'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80', },
  { id: 5, color: 'Silver', specification: '16GB RAM, 512GB SSD', price: 1499, discount: 100, image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', },
  { id: 6, color: 'Red', status: true, specification: '8GB RAM', price: 2999, discount: 400, image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80', },
]

const ProductOriginDetails = () => {
  const { id } = useParams();
  const product = useSelector((state) => selectProductOriginyById(state, id));

  return (
    <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row'
            },
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 3
          }}
        >
          <Typography variant='h5' component='h1' color='text.primary' sx={{ xs: { mb: 2 }, md: { mb: 0 } }}>
            {PRODUCT.name}
          </Typography>
          <Stack
            direction='row'
            alignItems='center'
            spacing={1}
          >
            <Button LinkComponent={RouterLink} to='/admin/product-origins/edit' color='primary'>
              <Iconify icon='eva:edit-outline' width={20} height={20} />
              &nbsp;
              Edit
            </Button>
            <Button color='error'>
              <Iconify icon='eva:trash-2-outline' width={20} height={20} />
              &nbsp;
              Delete
            </Button>
          </Stack>
        </Box>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={6}>
            <LabelAndContent label='CATEGORY' content={PRODUCT.category} />
          </Grid>
          <Grid item xs={6}>
            <LabelAndContent label='BRAND' content={PRODUCT.brand} />
          </Grid>
        </Grid>
        <Stack spacing={4}>
          <LabelAndContent label='INFORMATION' content={PRODUCT.information} />
          <LabelAndContent label='DESCRIPTION' content={PRODUCT.description} />
        </Stack>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 4,
            mb: 2
          }}
        >
          <Typography variant='body2' color='text.secondary'>
            PRODUCT VARIANTS
          </Typography>
          <Button variant='contained' color='primary'>
            <Iconify icon='eva:plus-fill' width={24} height={24} />
            &nbsp;
            Add Variant
          </Button>
        </Box>
        <Grid container spacing={2}>
          {PRODUCT_VARIANTS.map((variant) => (
            <Grid item xs={12} sm={6} md={4} key={variant.id}>
              <ProductVariantCard variant={variant} />
            </Grid>
          ))}
        </Grid>
    </>
  );
};

export default ProductOriginDetails;
