import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";

import ACTION_STATUS from '../../../constants/actionStatus';
import orderApi from '../../../services/orderApi';

const ordersAdapter = createEntityAdapter();

const initialState = ordersAdapter.getInitialState({
  getOrdersStatus: ACTION_STATUS.IDLE,
});

export const getOrders = createAsyncThunk(
  'orders/all',
  async () => {
    return await orderApi.getAll();
  }
);


const orderSlice = createSlice({
  name: 'adminOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getOrders.pending, (state) => {
        state.getOrdersStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.getOrdersStatus = ACTION_STATUS.SUCCEEDED;
        ordersAdapter.setAll(state, action.payload);
      })
      .addCase(getOrders.rejected, (state) => {
        state.getOrdersStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllOrders,
  selectById: selectOrderById,
  selectIds: selectOderIds,
} = ordersAdapter.getSelectors((state) => state.adminOrders);

const { reducer } = orderSlice;

export default reducer;
