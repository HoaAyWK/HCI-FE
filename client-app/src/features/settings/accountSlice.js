import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import ACTION_STATUS from '../../constants/actionStatus';
import accountApi from '../../services/accountApi';
import { getCurrentUserInfo } from "../auth/authSlice";

const initialState = {
  updateAccountStatus: ACTION_STATUS.IDLE,
  changePasswordStatus: ACTION_STATUS.IDLE
};

export const updateAccount = createAsyncThunk(
  'account/update',
  async (data, thunkApi) => {
    const res = await accountApi.updateAccount(data);

    thunkApi.dispatch(getCurrentUserInfo());

    return res;
  }
);

export const changePassword = createAsyncThunk(
  'account/changePassword',
  async (data) => {
    return await accountApi.changePassword(data);
  }
);

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    refresh: (state) => {
      state.updateAccountStatus = ACTION_STATUS.IDLE,
      state.changePasswordStatus = ACTION_STATUS.IDLE
    }
  },
  extraReducers: (builder) => {
    builder

      .addCase(updateAccount.pending, (state) => {
        state.updateAccountStatus = ACTION_STATUS.LOADING;
      })
      .addCase(updateAccount.fulfilled, (state) => {
        state.updateAccountStatus = ACTION_STATUS.SUCCEEDED;
      })
      .addCase(updateAccount.rejected, (state) => {
        state.updateAccountStatus = ACTION_STATUS.FAILED;
      })



      .addCase(changePassword.pending, (state) => {
        state.changePasswordStatus = ACTION_STATUS.LOADING;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.changePasswordStatus = ACTION_STATUS.SUCCEEDED;
      })
      .addCase(changePassword.rejected, (state) => {
        state.changePasswordStatus = ACTION_STATUS.FAILED;
      })
  }
});

const { reducer, actions } = accountSlice;

export const { refresh } = actions;

export default reducer;
