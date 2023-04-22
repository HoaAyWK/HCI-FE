import React, { useEffect } from 'react';
import { Box, CircularProgress, Stack } from '@mui/material';

import { ProductReview } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import ACTION_STATUS from '../../../../constants/actionStatus';
import { getProductReviewsByProductId } from './productReviewSlice';
import { useParams } from 'react-router-dom';

const ProductReviews = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { reviews, getReviewsStatus } = useSelector((state) => state.productReviews);

  useEffect(() => {
    dispatch(getProductReviewsByProductId(id))
  }, [id]);

  if (getReviewsStatus === ACTION_STATUS.IDLE ||
      getReviewsStatus === ACTION_STATUS.LOADING) {
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack spacing={0}>
      {reviews.map((review) => (
        <ProductReview key={review?.id} review={review} />
      ))}
    </Stack>
  );
};

export default ProductReviews;
