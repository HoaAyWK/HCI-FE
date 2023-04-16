import React, { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, Stack, Typography } from '@mui/material';

import { Iconify } from '../../../../components';
import { LabelAndContent } from '../../common/components';
import { ProductVariantImage } from './components';

const PRODUCT_ORIGIN = {
  id: 1,
  name: 'MacBook Pro M1 2020',
};

const PRODUCT_VARIANT = {
  id: 1,
  color: 'White',
  specifiation: '16GB RAM',
  price: 1299,
  quantity: 200,
  discount: 99,
  images: [
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80',
  ]
};

const ProductVariantDetails = () => {
  const imagesExceptFirst = useMemo(() => {
    return PRODUCT_VARIANT.images.slice(1);
  }, [PRODUCT_VARIANT]);

  const sliderSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    siliesToScroll: 1
  };

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
            {PRODUCT_ORIGIN.name}
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
        <Grid container spacing={4}>
          <Grid item container spacing={2} xs={12} md={6}>
            <Grid item xs={12}>
              <Box
                component='img'
                src={PRODUCT_VARIANT.images[0]}
                alt='image'
                sx={{
                  objectFit: 'cover',
                  width: '100%',
                  borderRadius: 1,
                }}
                loading='lazy'
              />
            </Grid>
            {imagesExceptFirst.map((image) => (
              <Grid key={image} item xs={12} sm={6} md={4}>
                <ProductVariantImage image={image} />
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <LabelAndContent label='specification' content={PRODUCT_VARIANT.specifiation} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LabelAndContent label='color' content={PRODUCT_VARIANT.color} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LabelAndContent label='quantity' content={PRODUCT_VARIANT.quantity} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LabelAndContent label='price' content={`$${PRODUCT_VARIANT.price}`} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LabelAndContent label='discount' content={`$${PRODUCT_VARIANT.discount}`} />
              </Grid>
            </Grid>
          </Grid>
      </Grid>
    </>
  );
};

export default ProductVariantDetails;
