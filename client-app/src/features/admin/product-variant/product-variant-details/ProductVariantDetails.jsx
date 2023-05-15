import React, { useEffect, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { Iconify, Cover, Label } from '../../../../components';
import { FetchDataErrorMessage, LabelAndContent, Loading } from '../../components';
import { ProductVariantImage } from './components';
import { getProductVariants, selectProductVariantById } from '../productVariantSlice';
import ACTION_STATUS from '../../../../constants/actionStatus';
import emptyImage from '../../../../assets/images/image_illustration.png';
import { COLOR_LIST } from '../../../../constants/colors';
import { fCurrency } from '../../../../utils/formatNumber';

const ProductVariantDetails = ({ productVariantId }) => {
  const dispatch = useDispatch();
  const productVariant = useSelector((state) => selectProductVariantById(state, productVariantId));
  const { getProductVariantsStatus } = useSelector((state) => state.adminProductVariants);

  const imagesExceptFirst = useMemo(() => {
    return productVariant?.media?.slice(1);
  }, [productVariant]);

  useEffect(() => {
    if (getProductVariantsStatus === ACTION_STATUS.IDLE) {
      dispatch(getProductVariants());
    }
  }, []);

  if (getProductVariantsStatus === ACTION_STATUS.IDLE ||
      getProductVariantsStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getProductVariantsStatus === ACTION_STATUS.FAILED) {
    return <FetchDataErrorMessage />;
  }

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
            {productVariant?.name}
          </Typography>
          <Stack
            direction='row'
            alignItems='center'
            spacing={1}
          >
            <Button LinkComponent={RouterLink} to={`/admin/product-variants/edit/${productVariantId}`} color='primary'>
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
              {productVariant?.media?.length > 0 ? (
                  <Cover
                    component='img'
                    src={productVariant.media[0]}
                    alt='image'
                    sx={{
                      objectFit: 'cover',
                      width: '100%',
                      maxHeight: 450,
                      borderRadius: 1,
                    }}
                    loading='lazy'
                  />
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', py: 2 }}>
                  <Cover
                    component='img'
                    alt='image'
                    loading='lazy'
                    src={emptyImage}
                    sx={{
                      width: 200,
                      height: 160,
                      objectFit: 'cover',
                      mb: 2
                    }}
                  />
                  <Typography variant='body1' color='text.secondary' textAlign='center'>
                    This product does not have any image
                  </Typography>
                </Box>
              )}
            </Grid>
            {imagesExceptFirst?.length > 0 && (
              imagesExceptFirst?.map((image) => (
                <Grid key={image} item xs={12} sm={6} md={4}>
                  <ProductVariantImage image={image} />
                </Grid>
              ))
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <LabelAndContent label='specification' content={productVariant?.specifications} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LabelAndContent label='color' content={COLOR_LIST[productVariant?.color]} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LabelAndContent label='quantity' content={productVariant.warehouse ? productVariant.warehouse : 0} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LabelAndContent label='price' content={`${fCurrency(productVariant.price)}`} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LabelAndContent label='discount' content={`${productVariant?.discount ? productVariant.discount : 0}%`} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={0.5}>
                  <Typography variant='body2' color='text.secondary' textTransform='uppercase'>
                    Status
                  </Typography>
                  <Box>
                    <Label color={productVariant?.status ? 'success' : 'error'} >
                      {productVariant?.status ? 'Available' : 'Unavailable'}
                    </Label>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Grid>
      </Grid>
    </>
  );
};

export default ProductVariantDetails;
