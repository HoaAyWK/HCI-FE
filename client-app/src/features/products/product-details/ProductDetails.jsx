import React, { useState } from 'react';
import { Box, Grid, Stack, Typography, Rating, Divider, Button, Tab, Pagination, LinearProgress } from '@mui/material';

import { ProductReview, SyncSlider } from '../components';
import { StyledPaper } from '../components/styles';
import { Iconify, QuantityControl } from '../../../components';
import ProductReviewDialog from '../ProductReviewDialog';
import { ColorButton, SpecificationsButton, Divider as DashedDivider } from './components';

const RATINGS  = [
  { name: '5 Star', percentage: 70, numOfRatings: 16 },
  { name: '4 Star', percentage: 12, numOfRatings: 7 },
  { name: '3 Star', percentage: 8, numOfRatings: 5 },
  { name: '2 Star', percentage: 7, numOfRatings: 3 },
  { name: '1 Star', percentage: 3, numOfRatings: 1 },
];


const VARIANTS = [
  {
    specifications: '8GB RAM 256GB SSD',
    price: 1999,
    discount: 99,
    colors: [ 'Black', 'Sliver', 'White' ],
    selected: true,
  },
  {
    specifications: '8GB RAM 512GB SSD',
    price: 2999,
    discount: 499,
    colors: [ 'Black', 'Sliver' ],
    selected: false,
  },
  {
    specifications: '16GB RAM 256GB SSD',
    price: 3499,
    discount: 299,
    colors: [ 'Blue' ],
    selected: false,
  },
  {
    specifications: '16GB RAM 512GB SSD',
    price: 5000,
    discount: 1000,
    colors: [ 'Sliver', 'White' ],
    selected: false,
  },
];

const COLORS = [
  {
    id: 1,
    color: 'White',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    price: 5000,
    select: true
  },
  {
    id: 2,
    color: 'Silver',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    price: 5000,
    select: false
  },
]

const ProductDetails = (props) => {
  const [openReview, setOpenReview] = useState(false);

  const handleCloseReview = () => {
    setOpenReview(false);;
  };

  const handleOpenReview = () => {
    setOpenReview(true);
  };

  const product = {
    name: 'Laptop Thinkpad E490',
    price: '299.99',
    priceSale: '349.99',
    numOfReviews: 99,
    colors: ['red', 'green', 'blue'],
    rating: 4.5
  };

  const images = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80'
    },
  ];

  return (
    <>
      <Grid container spacing={4} sx={{ pt: 2 }}>
        <Grid item xs={12} md={6}>
          <SyncSlider images={images} />
        </Grid>
        <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant='h6' component='h1'>
                {product.name}
              </Typography>
              <Stack spacing={1} direction='row'>
                <Rating readOnly value={product.rating} precision={0.5} />
                <Typography variant='body1' color='text.secondary'>
                  ({product.numOfReviews} reviews)
                </Typography>
              </Stack>
              <Stack spacing={1} direction='row' alignItems='center'>
                <Typography variant='h3' component='span' color='error'>
                  ${product.price}
                </Typography>
                <Typography variant='h4' component='span' color='text.secondary'>
                  <s>${2999}</s>
                </Typography>
              </Stack>
            </Stack>
            <DashedDivider />
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {VARIANTS.map((variant) => (
                <Grid item xs={12} md={6} key={variant.specifications}>
                  <SpecificationsButton variant={variant} select={variant.selected} />
                </Grid>
              ))}
            </Grid>
            <Box sx={{ mt: 2, mb: 3, width: '100%' }}>
              <Typography variant='body1'>
                Colors
              </Typography>
              <Grid container spacing={2} sx={{ mt: 0.5 }}>
                {COLORS.map((color) => (
                  <Grid item key={color.id} xs={12} md={4}>
                    <ColorButton colorItem={color} select={color.select} />
                  </Grid>
                ))}
              </Grid>
            </Box>
            <DashedDivider />
            <Stack spacing={3} sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <Typography variant='body1'>
                  Quantity
                </Typography>
                <QuantityControl quantity={1} />
              </Box>
            </Stack>
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={6}>
                <Button variant='contained' color='primary' fullWidth size='large'>
                  <Iconify icon='material-symbols:add-shopping-cart-outline-rounded' width={24} height={24} />
                  Add To Cart
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant='contained' color='warning' fullWidth size='large'>
                  Buy Now
                </Button>
              </Grid>
            </Grid>
        </Grid>
      </Grid>
      <Box
        sx={{ width: '100%', my: 4 }}
      >
        <StyledPaper>
          <Grid container spacing={2}
            sx={{
              borderBottom: (theme) => `1px dashed ${theme.palette.divider}`,
              mb: 4
            }}
          >
            <Grid item xs={12}>
              <Box
                sx={{
                  background: (theme) => theme.palette.background.neutral,
                  width: '100%',
                  p: 2
                }}
              >
                <Typography variant='h6' component='h1'>Reviews</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}
              sx={{
                borderRight: (theme) => `1px dashed ${theme.palette.divider}`,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  my: 3
                }}
              >
                <Typography varaint='subtitle1' color='text.secondary' fontWeight='bold'>
                  Average Rating
                </Typography>
                <Typography variant='h2' color='text.primary' sx={{ my: 1 }}>
                  4.5/5
                </Typography>
                <Stack spacing={0.5}>
                  <Rating readOnly value={4.6} precision={0.5} />
                  <Typography variant='caption' color='text.secondary' textAlign='center'>(25 reviews)</Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alginItems: 'center',
                  my: 2
                }}
              >
                <Stack spacing={1}>
                  {RATINGS.map((rating) => (
                    <Stack spacing={2} direction='row' key={rating.name} alignItems='center'>
                      <Typography varaint='subtitle1' color='text.primary'>
                        {rating.name}
                      </Typography>
                      <LinearProgress color='inherit' variant='determinate' value={rating.percentage} sx={{ minWidth: 200 }} />
                      <Typography variant='subtitle1' color='text.secondary'>
                        {rating.numOfRatings}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}
              sx={{
                borderLeft: (theme) => `1px dashed ${theme.palette.divider}`,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  mb: 4
                }}
              >
                <Button variant='outlined' color='inherit' size='large' onClick={handleOpenReview}>
                  <Iconify icon='eva:edit-outline' width={24} height={24} />
                  &nbsp;
                  Write your review
                </Button>
              </Box>
            </Grid>
          </Grid>
          <ProductReviewDialog
            dialogTitle='Write Review'
            open={openReview}
            handleClose={handleCloseReview}
            isEdit={false}
          />
          <Box sx={{ px: 2, pb: 2 }}>
            <Stack spacing={0}>
              <ProductReview />
              <ProductReview />
              <ProductReview />
              <ProductReview />
              <ProductReview />
            </Stack>
            <Box
              sx={{
                mt: 2,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <Pagination count={10} color='primary' />
            </Box>
          </Box>
        </StyledPaper>
      </Box>
    </>
  );
};

export default ProductDetails;
