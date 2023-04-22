import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import productReviewApi from '../../../../services/productReviewApi';
import ACTION_STATUS from '../../../../constants/actionStatus';

const initialState = {
  reviews: [],
  getReviewsState: ACTION_STATUS.IDLE,
  createReviewState: ACTION_STATUS.IDLE,
};

export const getProductReviewsByProductId = createAsyncThunk(
  'productReviews/reviewsByProductId',
  async (id) => {
    return await productReviewApi.getProductReviewsByProductId(id);
  }
);

export const createProductReview = createAsyncThunk(
  'productReviews/create',
  async (data) => {
    return await productReviewApi.createrProductReview(data);
  }
);

const productReviewsSlice = createSlice({
  name: 'productReviews',
  initialState,
  reducers: {
    refresh: (state) => {
      state.createReviewState = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder


      .addCase(getProductReviewsByProductId.pending, (state) => {
        state.getReviewsState = ACTION_STATUS.LOADING;
      })
      .addCase(getProductReviewsByProductId.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(getProductReviewsByProductId.rejected, (state) => {
        state.getReviewsState = ACTION_STATUS.FAILED;
      })


      .addCase(createProductReview.pending, (state) => {
        state.createReviewState = ACTION_STATUS.LOADING;
      })
      .addCase(createProductReview.fulfilled, (state, action) => {
        state.createReviewState = ACTION_STATUS.SUCCEEDED;
        state.reviews.push(action.payload);
      })
      .addCase(createProductReview.rejected, (state) => {
        state.createReviewState = ACTION_STATUS.FAILED;
      })
  }
});

const { reducer, actions } = productReviewsSlice;

export const { refresh } = actions;

export default reducer;

