import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { Box, Grid, Stack, Typography, Rating, Button, Tab, Pagination, LinearProgress } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { SyncSlider } from '../components';
import { StyledPaper } from '../components/styles';
import { Iconify, Loading, QuantityControl, ShowMoreParagraph } from '../../../components';
import { ProductReviewDialog } from '../../common/product-reviews';
import { ColorButton, SpecificationsButton, Divider as DashedDivider } from './components';
import ProductReviews from './product-reviews';
import { getProductDetailSingle } from '../../common/productDetailsSlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import { fCurrency, fShortenNumber2 } from '../../../utils/formatNumber';
import { createMarkup } from '../../../utils/sanitizeHtml';
import { addToCart } from '../../common/cartSlice';
import { getProductReviewsByProductId, refresh } from '../../common/product-reviews/productReviewSlice';


const ProductDetails = (props) => {
  const { id } = props;
  const dispatch = useDispatch();
  const { getSingleStatus, productSingle } = useSelector((state) => state.productDetails);
  const [openReview, setOpenReview] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { reviews, getReviewsStatus, createReviewStatus } = useSelector((state) => state.productReviews);

  const variantColors = useMemo(() => {
    if (!productSingle && !productSingle?.sameOriginProducts) {
      return [];
    }

    return productSingle.sameOriginProducts
      .filter((product) => product.specifications === productSingle.specifications);
  }, [productSingle]);

  const reviewStats = useMemo(() => {
    if (reviews?.stats) {
      return reviews.stats.toReversed();
    }

    return [];
  });

  useEffect(() => {
    dispatch(getProductDetailSingle(id));
    dispatch(getProductReviewsByProductId(id));
  }, [id]);

  useEffect(() => {
    if (createReviewStatus === ACTION_STATUS.SUCCEEDED) {
      dispatch(getProductReviewsByProductId(id));
      dispatch(getProductDetailSingle(id));
      dispatch(refresh());
    }
  }, [createReviewStatus]);

  const handleCloseReview = () => {
    setOpenReview(false);
  };

  const handleOpenReview = () => {
    setOpenReview(true);
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prev => prev - 1);
  };

  const handleClickAddToCart = async () => {
    try {
      const actionResult = await dispatch(addToCart({ productId: id, quantity: quantity }));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar(`Added ${quantity} item to your cart`, { variant: 'success' });
        setQuantity(1);
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleClickBuyNow = async () => {
    try {
      const actionResult = await dispatch(addToCart({ productId: id, quantity: quantity }));
      const result = unwrapResult(actionResult);

      if (result) {
        setQuantity(1);
        navigate('/checkout');
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  if (getSingleStatus === ACTION_STATUS.IDLE ||
    getSingleStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getSingleStatus === ACTION_STATUS.FAILED) {
    return <Navigate to='/' />;
  }

  return (
    <>
      <Grid container spacing={4} sx={{ pt: 2 }}>
        <Grid item xs={12} md={6}>
          <SyncSlider images={productSingle.media} />
        </Grid>
        <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Typography variant='h5' component='h1'>
                {productSingle.name}
              </Typography>
              {productSingle.averageRating > 0 && (
                <Stack spacing={1} direction='row'>
                  <Rating readOnly value={productSingle.averageRating} precision={0.5} />
                  <Typography variant='body1' color='text.secondary'>
                    {`(${productSingle.numReviews} ${productSingle.numReviews > 1 ? 'reviews' : 'review'})`}
                  </Typography>
                </Stack>
              )}
              <Stack spacing={1} direction='row' alignItems='center'>
                <Typography variant='h3' component='span' color='error'>
                  {fCurrency(productSingle.price - (productSingle.price * (productSingle.discount / 100)))}
                </Typography>
                <Typography variant='h4' component='span' color='text.secondary'>
                  <s>{fCurrency(productSingle.price)}</s>
                </Typography>
              </Stack>
            </Stack>
            <DashedDivider />
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {productSingle.sameOriginProducts.map((variant) => {
                if (variant.id === id) {
                  return (
                    <Grid item xs={12} md={6} key={variant.id}>
                      <SpecificationsButton variant={variant} select={variant.specifications === productSingle.specifications} />
                    </Grid>
                  )
                }

                if (variant.specifications !== productSingle.specifications) {
                  return (
                    <Grid item xs={12} md={6} key={variant.id}>
                      <SpecificationsButton variant={variant} select={variant.specifications === productSingle.specifications} />
                    </Grid>
                  )
                }

                return (<Fragment key={variant.id} />);
                })}
            </Grid>
            <Box sx={{ mt: 2, mb: 3, width: '100%' }}>
              <Typography variant='body1'>
                Colors
              </Typography>
              <Grid container spacing={2} sx={{ mt: 0.5 }}>
                {variantColors.map((variant) => (
                  <Grid item key={variant.id} xs={12} md={4}>
                    <ColorButton colorItem={variant} select={variant.id === id} />
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
                <QuantityControl
                  quantity={quantity}
                  increaseQuantity={handleIncreaseQuantity}
                  decreaseQuantity={handleDecreaseQuantity}
                  max={productSingle?.warehouse}
                />
              </Box>
            </Stack>
            <Grid container spacing={2} sx={{ mt: 4 }}>
              <Grid item xs={6}>
                <Button
                  variant='contained'
                  color='primary'
                  fullWidth
                  size='large'
                  onClick={handleClickAddToCart}
                >
                  <Iconify icon='material-symbols:add-shopping-cart-outline-rounded' width={24} height={24} />
                  Add To Cart
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant='contained'
                  color='warning'
                  fullWidth
                  size='large'
                  onClick={handleClickBuyNow}
                >
                  Buy Now
                </Button>
              </Grid>
            </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={7}>
          <StyledPaper sx={{ px: 2, pt: 2 }}>
            <Typography variant='h6' component='h1' color='text.primary' sx={{ mb: 2 }}>
              Description
            </Typography>
            <ShowMoreParagraph
              isDanger={true} content={productSingle.description}
              heigth={productSingle?.description?.length > 200 ? '190px': 'auto'}
              canShowMore={productSingle?.description?.length > 200 ? true: false}
            />
            <Box sx={{ pb: 6 }} />
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={5}>
          <StyledPaper sx={{ p: 2 }}>
            <Typography variant='h6' component='h1' color='text.primary' sx={{ mb: 2 }}>
              Information
            </Typography>
            <Typography
              variant='body1'
              color='text.primary'
              dangerouslySetInnerHTML={createMarkup(productSingle?.information)}
            />
          </StyledPaper>
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
                  {fShortenNumber2(productSingle.averageRating)}/5
                </Typography>
                <Stack spacing={0.5}>
                  <Rating readOnly value={productSingle.averageRating} precision={0.5} />
                  <Typography variant='caption' color='text.secondary' textAlign='center'>
                    {`(${productSingle.numReviews} ${productSingle.numReviews > 1 ? 'reviews' : 'review'})`}
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              {getReviewsStatus === ACTION_STATUS.SUCCEEDED && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alginItems: 'center',
                    my: 2
                  }}
                >
                  <Stack spacing={1}>
                    {reviewStats.map((rating) => (
                      <Stack spacing={2} direction='row' key={rating.name} alignItems='center'>
                        <Typography varaint='subtitle1' color='text.primary'>
                          {rating.value} &nbsp; Star
                        </Typography>
                        <LinearProgress color='inherit' variant='determinate' value={rating.total / productSingle.numReviews * 100} sx={{ minWidth: 200 }} />
                        <Typography variant='subtitle1' color='text.secondary'>
                          {rating.total}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}
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
            productId={id}
          />
          <Box sx={{ px: 2, pb: 2 }}>
            <ProductReviews reviews={reviews.reviews} status={getReviewsStatus} />
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
