import React, { useState } from 'react';
import { Box, Grid, Stack, Typography, Rating, Divider, Button, Tab, Pagination } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { ProductReview, SyncSlider } from './components';
import { StyledPaper } from './components/styles';
import { Iconify } from '../../components';


const ProductDetail = (props) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabValueChange = (event, newValue) => {
    setTabValue(newValue);
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
      url: '/static/images/laptop.jpg'
    },
    {
      id: 2,
      url: '/static/images/laptop_1.jpg'
    },
    {
      id: 4,
      url: '/static/images/laptop_2.jpg'
    },
    {
      id: 3,
      url: '/static/images/laptop_3.jpg'
    },
    {
      id: 5,
      url: '/static/images/laptop_4.jpg'
    },
    {
      id: 6,
      url: '/static/images/laptop_5.jpg'
    },
    {
      id: 7,
      url: '/static/images/laptop_6.jpg'
    },
  ];

  return (
    <>
      <Grid container spacing={4}>
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
              <Divider />
              <Typography variant='body1' color='text.secondary'>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.

  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
              </Typography>
              <Divider />
              <Typography variant='body1'>
                Colors
              </Typography>
              <Stack direction='row' spacing={1}>
                {product.colors.map((color) => (
                  <Box
                    key={color}
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: `${color}`
                    }}
                  />
                ))}
              </Stack>
            </Stack>
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={6}>
                <Button variant='contained' color='primary' fullWidth>
                  <Iconify icon='material-symbols:add-shopping-cart-outline-rounded' width={24} height={24} />
                  Add To Cart
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button variant='contained' color='warning' fullWidth>
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
          <TabContext value={tabValue}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleTabValueChange} aria-label='product tab'>
                <Tab label='Description' value={0} />
                <Tab label='Reviews' value={1} />
              </TabList>
            </Box>
            <TabPanel value={0}>
              Hello
            </TabPanel>
            <TabPanel value={1}>
              <Stack spacing={3}>
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
            </TabPanel>
          </TabContext>
        </StyledPaper>
      </Box>
    </>
  );
};

export default ProductDetail;
