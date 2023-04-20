import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import { ProductCard } from '../common/components';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, selectAllProductDetails } from './productDetailsSlice';
import ACTION_STATUS from '../../constants/actionStatus';
import ProductListSectionSkeleton from './components/ProductListSectionSkeleton';

const PRODUCTS = [
  {
    id: 1,
    name: 'Lenovo Thinkpad E490',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    price: '1299',
    discount: '99',
    status: true,
    rating: 4.5
  },
  {
    id: 2,
    name: 'Lenovo Thinkpad E490',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    price: '1399',
    discount: '399',
    status: true,
    rating: 3.6
  },
  {
    id: 3,
    name: 'Lenovo Thinkpad E490',
    image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    price: '1199',
    priceSale: '199',
    status: true,
    rating: 4.2
  },
  {
    id: 4,
    name: 'Lenovo Thinkpad E490',
    image: 'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80',
    price: '1599',
    priceSale: '99',
    status: true,
    rating: 4.0
  },
  {
    id: 5,
    name: 'Lenovo Thinkpad E490',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    price: '1299',
    priceSale: '299',
    status: true,
    rating: 4.2
  },
];

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('xs')]: {
    justifyContent: 'flex-start',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
  }
}));

const ProductListSection = ({ title }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProductDetails);
  const { getProductDetailsStatus } = useSelector((state) => state.productDetails);

  useEffect(() => {
    if (getProductDetailsStatus === ACTION_STATUS.IDLE) {
      dispatch(getProductDetails());
    }
  }, []);

  if (getProductDetailsStatus !== ACTION_STATUS.SUCCEEDED) {
    return <ProductListSectionSkeleton />;
  }


  return (
    <Box
      sx={{ mt: 4 }}
    >
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} md={6}>
          <Typography variant='h5' component='h1' color='text.primary'>
            {title}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledBox>
            <Stack spacing={1} direction='row'>
              <Button variant='contained' color='primary'>
                Laptop
              </Button>
              <Button>
                Smartphone
              </Button>
              <Button>
                Components
              </Button>
            </Stack>
          </StyledBox>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductListSection;
