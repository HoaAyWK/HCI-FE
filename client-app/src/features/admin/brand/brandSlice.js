import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import ACTION_STATUS from '../../../constants/actionStatus';
import categoryApi from '../../../services/categoryApi';

const brandsAdapter = createEntityAdapter();

const initialState = brandsAdapter.getInitialState({
  getBrandsStatus: ACTION_STATUS.IDLE,
  createBrandStatus: ACTION_STATUS.IDLE,
  updateBrandStatus: ACTION_STATUS.IDLE,
  deleteBrandStatus: ACTION_STATUS.IDLE,
});

export const getBrands = createAsyncThunk(
  'brands/all',
  async () => {
    return await categoryApi.getAll();
  }
);

export const createBrand = createAsyncThunk(
  'brands/create',
  async (category) => {
    return await categoryApi.create(category);
  }
);

export const updateBrand = createAsyncThunk(
  'brands/update',
  async (category) => {
    const { id, ...data } = category;

    return await categoryApi.update(id, data);
  }
);

export const deleteBrand = createAsyncThunk(
  'brands/delete',
  async (id) => {
    return await categoryApi.delete(id);
  }
);

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    refresh: (state) => {
      state.createBrandStatus = ACTION_STATUS.IDLE;
      state.updateBrandStatus = ACTION_STATUS.IDLE;
      state.deleteBrandStatus = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(getBrands.pending, (state) => {
        state.getBrandsStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getBrands.fulfilled, (state, action) => {
        state.getBrandsStatus = ACTION_STATUS.SUCCEEDED;
        brandsAdapter.setAll(state, action.payload);
      })
      .addCase(getBrands.rejected, (state) => {
        state.getBrandsStatus = ACTION_STATUS.FAILED;
      })


      .addCase(createBrand.pending, (state) => {
        state.createBrandStatus = ACTION_STATUS.LOADING;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.createBrandStatus = ACTION_STATUS.SUCCEEDED;
        brandsAdapter.addOne(state, action.payload);
      })
      .addCase(createBrand.rejected, (state) => {
        state.createBrandStatus = ACTION_STATUS.FAILED;
      })


      .addCase(updateBrand.pending, (state) => {
        state.updateBrandStatus = ACTION_STATUS.LOADING;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.updateBrandStatus = ACTION_STATUS.SUCCEEDED;

        let existingCategory = state.entities[action.payload.id];

        if (existingCategory) {
          existingCategory = action.payload;
        }
      })
      .addCase(updateBrand.rejected, (state) => {
        state.updateBrandStatus = ACTION_STATUS.FAILED;
      })


      .addCase(deleteBrand.pending, (state) => {
        state.deleteBrandStatus = ACTION_STATUS.LOADING;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.deleteBrandStatus = ACTION_STATUS.SUCCEEDED;
        brandsAdapter.removeOne(state, action.payload);
      })
      .addCase(deleteBrand.rejected, (state) => {
        state.deleteBrandStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllBrands,
  selectById: selectBrandById,
  selectIds: selectBrandIds,
} = brandsAdapter.getSelectors((state) => state.adminBrands);

const { reducer, actions } = brandSlice;
export const { refresh } = actions;

export default reducer;
