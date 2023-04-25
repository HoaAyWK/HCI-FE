import { createAsyncThunk, createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

import productDetailsApi from '../../services/productDetailsApi';
import ACTION_STATUS from '../../constants/actionStatus';

const productDetailsAdapter = createEntityAdapter();

const initialState = productDetailsAdapter.getInitialState({
  getProductDetailsStatus: ACTION_STATUS.IDLE,
  getSingleStatus: ACTION_STATUS.IDLE,
  productSingle: null
});

export const getProductDetails = createAsyncThunk(
  'productDetails/all',
  async () => {
    return await productDetailsApi.getAll();
  }
);

export const getProductDetailSingle = createAsyncThunk(
  'productDetails/single',
  async (id) => {
    return await productDetailsApi.getSingle(id);
  }
);

const productDetailsSlice = createSlice({
  name: 'productDetails',
  initialState,
  extraReducers: (builder) => {
    builder


      .addCase(getProductDetails.pending, (state) => {
        state.getProductDetailsStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        state.getProductDetailsStatus = ACTION_STATUS.SUCCEEDED;
        productDetailsAdapter.setAll(state, action.payload.items);
      })
      .addCase(getProductDetails.rejected, (state) => {
        state.getProductDetailsStatus = ACTION_STATUS.FAILED;
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
} = productDetailsAdapter.getSelectors((state) => state.productDetails);

export const selectProductDetailWithImage = createSelector(
  [selectAllProductDetails],
  (productDetails) => productDetails.filter(productDetail => productDetail.media.length > 0)
);

const { reducer } = productDetailsSlice;

export default reducer;
