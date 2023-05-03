import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import productDetailsApi from '../../services/productDetailsApi';
import ACTION_STATUS from '../../constants/actionStatus';

const bestSellersAdapter = createEntityAdapter();

const initialState = bestSellersAdapter.getInitialState({
  getBestSellersStatus: ACTION_STATUS.IDLE,
  getSingleStatus: ACTION_STATUS.IDLE,
  totalItems: 0,
  productSingle: null
});


export const getProductDetailSingle = createAsyncThunk(
  'productDetails/single',
  async (id) => {
    return await productDetailsApi.getSingle(id);
  }
);

export const getBestSellers = createAsyncThunk(
  'productDetails/bestSellers',
  async ({ num, page }) => {
    return await productDetailsApi.getBestSellers(num, page);
  }
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  extraReducers: (builder) => {
    builder


      .addCase(getBestSellers.pending, (state) => {
        state.getBestSellersStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getBestSellers.fulfilled, (state, action) => {
        state.getBestSellersStatus = ACTION_STATUS.SUCCEEDED;
        state.totalItems = action.payload.totalItems;
        bestSellersAdapter.addMany(state, action.payload.items);
      })
      .addCase(getBestSellers.rejected, (state) => {
        state.getBestSellersStatus = ACTION_STATUS.FAILED;
      })


      .addCase(getProductDetailSingle.pending, (state) => {
        state.getSingleStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getProductDetailSingle.fulfilled, (state, action) => {
        state.getSingleStatus = ACTION_STATUS.SUCCEEDED;
        state.productSingle = action.payload;
      })
      .addCase(getProductDetailSingle.rejected, (state) => {
        state.getSingleStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllProductDetails,
  selectById: selectProductDetailById
} = bestSellersAdapter.getSelectors((state) => state.productDetails);

export const selectProductDetailWithImage = createSelector(
  [selectAllProductDetails],
  (productDetails) => productDetails.filter(productDetail => productDetail.media.length > 0)
);

const { reducer } = productDetailsSlice;

export default reducer;
