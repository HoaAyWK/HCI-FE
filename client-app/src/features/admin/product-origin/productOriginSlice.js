import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import productOriginApi from '../../../services/productOriginApi';
import ACTION_STATUS from '../../../constants/actionStatus';

const productOriginsAdapter = createEntityAdapter();

const initialState = productOriginsAdapter.getInitialState({
  getProductOriginStatus: ACTION_STATUS.IDLE,
  createProductOriginStatus: ACTION_STATUS.IDLE,
  updateProductOriginStatus: ACTION_STATUS.IDLE,
  deleteProductOriginStatus: ACTION_STATUS.IDLE
});

export const getProductOrigins = createAsyncThunk(
  'productOrigins/all',
  async () => {
    return await productOriginApi.getAll();
  }
);

export const createProductOrigin = createAsyncThunk(
  'productOrigins/create',
  async (data) => {
    return await productOriginApi.create(data);
  }
);

export const updateProductOrigin = createAsyncThunk(
  'productOrigins/update',
  async (data) => {
    return await productOriginApi.update(data);
  }
);

export const deleteProductOrigin = createAsyncThunk(
  'productOrigin/delete',
  async (id) => {
    return await productOriginApi.delete(id);
  }
);

const productOriginSlice = createSlice({
  name: 'adminProductOrigins',
  initialState,
  reducers: {
    refresh: (state) => {
    state.createProductOriginStatus = ACTION_STATUS.IDLE,
    state.updateProductOriginStatus = ACTION_STATUS.IDLE,
    state.deleteProductOriginStatus = ACTION_STATUS.IDLE
    }
  },
  extraReducers: (builder) => {
    builder


      .addCase(getProductOrigins.pending, (state) => {
        state.getProductOriginStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getProductOrigins.fulfilled, (state, action) => {
        state.getProductOriginStatus = ACTION_STATUS.SUCCEEDED;
        productOriginsAdapter.setAll(state, action.payload);
      })
      .addCase(getProductOrigins.rejected, (state) => {
        state.getProductOriginStatus = ACTION_STATUS.FAILED;
      })



      .addCase(createProductOrigin.pending, (state) => {
        state.createProductOriginStatus = ACTION_STATUS.LOADING;
      })
      .addCase(createProductOrigin.fulfilled, (state, action) => {
        state.createProductOriginStatus = ACTION_STATUS.SUCCEEDED;
        productOriginsAdapter.addOne(state, action.payload);
      })
      .addCase(createProductOrigin.rejected, (state) => {
        state.createProductOriginStatus = ACTION_STATUS.FAILED;
      })


      .addCase(updateProductOrigin.pending, (state) => {
        state.updateProductOriginStatus = ACTION_STATUS.LOADING;
      })
      .addCase(updateProductOrigin.fulfilled, (state, action) => {
        state.updateProductOriginStatus = ACTION_STATUS.SUCCEEDED;
        const { id, ...data } = action.payload;
        productOriginsAdapter.updateOne(state, { id, changes: data });
      })
      .addCase(updateProductOrigin.rejected, (state) => {
        state.updateProductOriginStatus = ACTION_STATUS.FAILED;
      })

      .addCase(deleteProductOrigin.pending, (state) => {
        state.deleteProductOriginStatus = ACTION_STATUS.LOADING;
      })
      .addCase(deleteProductOrigin.fulfilled, (state, action) => {
        state.deleteProductOriginStatus = ACTION_STATUS.SUCCEEDED;
        productOriginsAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteProductOrigin.rejected, (state) => {
        state.deleteProductOriginStatus = ACTION_STATUS.FAILED;
      })
  }
});


export const {
  selectAll: selectAllProductOrigins,
  selectById: selectProductOriginyById,
  selectIds: selectProductOriginIds,
} = productOriginsAdapter.getSelectors((state) => state.adminProductOrigins);

const { reducer, actions } = productOriginSlice;
export const { refresh } = actions;

export default reducer;
