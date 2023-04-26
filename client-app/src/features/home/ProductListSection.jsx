import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';

import { ProductCard } from '../common/components';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, selectAllProductDetails, selectProductDetailWithImage } from '../common/productDetailsSlice';
import ACTION_STATUS from '../../constants/actionStatus';
import ProductListSectionSkeleton from './components/ProductListSectionSkeleton';


const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.up('xs')]: {
    justifyContent: 'flex-start',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
  }
}));

const ProductListSection = ({ title, products }) => {
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
