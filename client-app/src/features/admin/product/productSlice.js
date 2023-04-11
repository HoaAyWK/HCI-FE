import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import ACTION_STATUS from '../../../constants/actionStatus';
import productApi from '../../../services/productApi';

const productsAdapter = createEntityAdapter();

const initialState = productsAdapter.getInitialState({
  getProductsStatus: ACTION_STATUS.IDLE,
  createProductStatus: ACTION_STATUS.IDLE,
  updateProductStatus: ACTION_STATUS.IDLE,
  deleteProductStatus: ACTION_STATUS.IDLE,
});

export const getProducts = createAsyncThunk(
  'products/all',
  async () => {
    return await productApi.getAll();
  }
);

export const createProducts = createAsyncThunk(
  'products/create',
  async (product) => {
    return await productApi.create(product);
  }
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async (product) => {
    const { id, ...data } = product;

    return await productApi.update(id, data);
  }
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id) => {
    return await productApi.delete(id);
  }
);

const productSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {
    refresh: (state) => {
      state.createProductStatus = ACTION_STATUS.IDLE;
      state.updateProductStatus = ACTION_STATUS.IDLE;
      state.deleteProductStatus = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(getProducts.pending, (state) => {
        state.getProductsStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.getProductsStatus = ACTION_STATUS.SUCCEEDED;
        productsAdapter.setAll(state, action.payload);
      })
      .addCase(getProducts.rejected, (state) => {
        state.getProductsStatus = ACTION_STATUS.FAILED;
      })


      .addCase(createProducts.pending, (state) => {
        state.createProductStatus = ACTION_STATUS.LOADING;
      })
      .addCase(createProducts.fulfilled, (state, action) => {
        state.createProductStatus = ACTION_STATUS.SUCCEEDED;
        productsAdapter.addOne(state, action.payload);
      })
      .addCase(createProducts.rejected, (state) => {
        state.createProductStatus = ACTION_STATUS.FAILED;
      })


      .addCase(updateProduct.pending, (state) => {
        state.updateProductStatus = ACTION_STATUS.LOADING;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.updateProductStatus = ACTION_STATUS.SUCCEEDED;

        let existingProduct = state.entities[action.payload.id];

        if (existingProduct) {
          existingProduct = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state) => {
        state.updateProductStatus = ACTION_STATUS.FAILED;
      })


      .addCase(deleteProduct.pending, (state) => {
        state.deleteProductStatus = ACTION_STATUS.LOADING;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.deleteProductStatus = ACTION_STATUS.SUCCEEDED;
        productsAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.deleteProductStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductIds,
} = productsAdapter.getSelectors((state) => state.adminProducts);

const { reducer, actions } = productSlice;
export const { refresh } = actions;

export default reducer;
