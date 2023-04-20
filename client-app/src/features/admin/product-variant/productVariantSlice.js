import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import ACTION_STATUS from '../../../constants/actionStatus';
import productDetailsApi from '../../../services/productDetailsApi';
import { uploadTaskPromise } from '../../../utils/uploadTaskPromise';

const productVariantsAdapter = createEntityAdapter();

const initialState = productVariantsAdapter.getInitialState({
  getProductVariantsStatus: ACTION_STATUS.IDLE,
  createProductVariantStatus: ACTION_STATUS.IDLE,
});

export const getProductVariants = createAsyncThunk(
  'adminProductVariants/all',
  async () => {
    return await productDetailsApi.getAll();
  }
);

export const createProductVariant = createAsyncThunk(
  'adminProductVariant/create',
  async (productVariant) => {
    const { id, images, ...data } = productVariant;

    if (images.length > 0) {
      const imagesUrl = [];

      for (let image of images) {
        const filePath = `files/product-variants/images/${uuidv4()}`;
        const url = await uploadTaskPromise(filePath, image.file);
        imagesUrl.push(url);
      }

      data.images = imagesUrl;
    }

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
        productVariantsAdapter.addMany(state, action.payload);
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
