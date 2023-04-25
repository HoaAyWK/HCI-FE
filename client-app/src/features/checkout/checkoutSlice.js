import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ACTION_STATUS from '../../constants/actionStatus';
import checkoutApi from '../../services/checkoutApi';

const initialState = {
  checkoutStatus: ACTION_STATUS.IDLE
};

export const checkoutWithCash = createAsyncThunk(
  'checkout/cash',
  async (data) => {
    return await checkoutApi.checkoutWithCash(data);
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    refresh: (state) => {
      state.checkoutStatus = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(checkoutWithCash.pending, (state) => {
        state.checkoutStatus = ACTION_STATUS.LOADING;
      })
      .addCase(checkoutWithCash.fulfilled, (state) => {
        state.checkoutStatus = ACTION_STATUS.SUCCEEDED;
      })
      .addCase(checkoutWithCash.rejected, (state) => {
        state.checkoutStatus = ACTION_STATUS.FAILED;
      })
  }
});


const { actions, reducer } = checkoutSlice;

export const { refresh } = actions;

export default reducer;
