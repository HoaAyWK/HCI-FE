import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getProductOrigins, selectProductOriginById } from '../productOriginSlice';
import { FetchDataErrorMessage, LabelAndContent, Loading } from '../../components';
import { ProductVariantCard } from './components';
import { Iconify } from '../../../../components';
import ACTION_STATUS from '../../../../constants/actionStatus';
import { getBrands, selectBrandById } from '../../brand/brandSlice';
import { createMarkup } from '../../../../utils/sanitizeHtml';
import { getCategories } from '../../category/categorySlice';
import { getProductVariants, selectProductVariantByProductOriginId } from '../../product-variant/productVariantSlice';

const ProductOriginDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => selectProductOriginById(state, id));
  const { getProductOriginsStatus } = useSelector((state) => state.adminProductOrigins);
  const { getProductVariantsStatus } = useSelector((state) => state.adminProductVariants);
  const brand = useSelector((state) => selectBrandById(state, product?.distributorId));
  const { getBrandsStatus } = useSelector((state) => state.adminBrands);
  const { entities: categoryEntities, getCategoriesStatus } = useSelector((state) => state.adminCategories);
  const productVariants = useSelector((state) => selectProductVariantByProductOriginId(state, id));

  useEffect(() => {
    if (getProductOriginsStatus === ACTION_STATUS.IDLE) {
      dispatch(getProductOrigins());
    }

    if (getProductVariantsStatus === ACTION_STATUS.IDLE) {
      dispatch(getProductVariants());
    }

    if (getBrandsStatus === ACTION_STATUS.IDLE) {
      dispatch(getBrands());
    }

    if (getCategoriesStatus === ACTION_STATUS.IDLE) {
      dispatch(getCategories());
    }
  }, []);

  if (getProductOriginsStatus === ACTION_STATUS.IDLE ||
      getProductOriginsStatus === ACTION_STATUS.LOADING ||
      getBrandsStatus === ACTION_STATUS.IDLE ||
      getBrandsStatus === ACTION_STATUS.LOADING ||
      getCategoriesStatus === ACTION_STATUS.IDLE ||
      getCategoriesStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getProductOriginsStatus === ACTION_STATUS.FAILED ||
      getBrandsStatus === ACTION_STATUS.FAILED ||
      getCategoriesStatus === ACTION_STATUS.FAILED) {
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
            {product.name}
          </Typography>
          <Stack
            direction='row'
            alignItems='center'
            spacing={1}
          >
            <Button LinkComponent={RouterLink} to={`/admin/product-origins/edit/${id}`} color='primary'>
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
            <Stack spacing={0.5}>
              <Typography variant='body2' color='text.secondary' textTransform='uppercase'>
                categories
              </Typography>
              <Typography
                variant='body1'
                color='text.primary'
              >
                {product.categories.map((categoryId) => (
                  categoryEntities[categoryId]?.name
                ))}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <LabelAndContent label='BRAND' content={brand?.name} />
          </Grid>
        </Grid>
        <Stack spacing={4}>
          <Stack spacing={0.5}>
            <Typography variant='body2' color='text.secondary' textTransform='uppercase'>
              description
            </Typography>
            <Typography
              variant='body1'
              color='text.primary'
              dangerouslySetInnerHTML={createMarkup(product.description)}
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',

                '& p': {
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                },
                '& span': {
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  color: 'inherit !important',
                  backgroundColor: 'inherit !important',
                  width: 'auto'
                },
              }}
            />
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant='body2' color='text.secondary' textTransform='uppercase'>
              information
            </Typography>
            <Typography
              variant='body1'
              color='text.primary'
              dangerouslySetInnerHTML={createMarkup(product.information)}
              sx={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',

                '& p': {
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                },
                '& span': {
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  color: 'inherit !important',
                  backgroundColor: 'inherit !important',
                  width: 'auto'
                },
              }}
            />
          </Stack>
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
          <Button variant='contained' color='primary' LinkComponent={RouterLink} to='/admin/product-variants/create'>
            <Iconify icon='eva:plus-fill' width={24} height={24} />
            &nbsp;
            Add Variant
          </Button>
        </Box>
        <Grid container spacing={2}>
          {productVariants.map((variant) => (
            <Grid item xs={12} sm={6} md={4} key={variant.id}>
              <ProductVariantCard variant={variant} />
            </Grid>
          ))}
        </Grid>
    </>
  );
};

export default ProductOriginDetails;
