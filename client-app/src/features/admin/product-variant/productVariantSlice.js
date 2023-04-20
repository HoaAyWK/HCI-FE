import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import ACTION_STATUS from '../../../constants/actionStatus';
import productDetailsApi from '../../../services/productDetailsApi';

const productVariantsAdapter = createEntityAdapter();

const initialState = productVariantsAdapter.getInitialState({
  getProductVariantsStatus: ACTION_STATUS.IDLE,
  createProductVariantStatus: ACTION_STATUS.IDLE,
});

const getProductVariants = createAsyncThunk(
  'adminProductVariants/all',
  async () => {
    return await productDetailsApi.getAll();
  }
);

const createProductVariant = createAsyncThunk(
  'adminProductVariant/create',
  async (data) => {
    return await productDetailsApi.create(data);
  }
);

const productVariantSlice = createSlice({
  name: 'adminProductVariants',
  initialState,
  reducers: {
    refresh: (state) => {
      state.createProductVariantStatus = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder


      .addCase(getProductVariants.pending, (state) => {
        state.getProductVariantsStatus = ACTION_STATUS.IDLE;
      })
      .addCase(getProductVariants.fulfilled, (state, action) => {
        state.getProductVariantsStatus = ACTION_STATUS.SUCCEEDED;
        productVariantsAdapter.setAll(state, action.payload.items);
      })
      .addCase(getProductVariants.rejected, (state) => {
        state.getProductVariantsStatus = ACTION_STATUS.FAILED;
      })



      .addCase(createProductVariant.pending, (state) => {
        state.createProductVariantStatus = ACTION_STATUS.LOADING;
      })
      .addCase(createProductVariant.fulfilled, (state, action) => {
        state.createProductVariantStatus = ACTION_STATUS.SUCCEEDED;
        productVariantsAdapter.setMany(state, action.payload);
      })
      .addCase(createProductVariant.rejected, (state) => {
        state.createProductVariantStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllProductVariants,
  selectById: selectProductVariantById,
} = productVariantsAdapter.getSelectors((state) => state.adminProductVariants);

const { reducer, actions } = productVariantSlice;

export const { refresh } = actions;

export default reducer;
