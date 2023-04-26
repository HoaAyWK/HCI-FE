import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import ACTION_STATUS from '../../constants/actionStatus';
import orderApi from '../../services/orderApi';

const billsAdapter = createEntityAdapter();

const initialState = billsAdapter.getInitialState({
  totalMyBillsPage: 0,
  myBillsPerPage: 0,
  getMyBillsStatus: ACTION_STATUS.IDLE,
});

export const getMyBills = createAsyncThunk(
  'bill/my',
  async ({ page, status }) => {
    return await orderApi.getMyBill(status, 5, page);
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder


      .addCase(getMyBills.pending, (state) => {
        state.getMyBillsStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getMyBills.fulfilled, (state, action) => {
        state.getMyBillsStatus = ACTION_STATUS.SUCCEEDED;
        state.totalMyBillsPage = action.payload.totalPage;
        state.myBillsPerPage = action.payload.perPage;
        billsAdapter.setAll(state, action.payload.bills);
      })
      .addCase(getMyBills.rejected, (state) => {
        state.getMyBillsStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllBills,
  selectById: selectBillById
} = billsAdapter.getSelectors(state => state.orders);

const { reducer } = orderSlice;

export default reducer;