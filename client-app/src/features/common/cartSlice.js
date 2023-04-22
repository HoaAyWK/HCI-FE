import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import ACTION_STATUS from '../../constants/actionStatus';
import cartApi from '../../services/cartApi';

const initialState = {
  cart: null,
  getCartStatus: ACTION_STATUS.IDLE,
  addToCartStatus: ACTION_STATUS.IDLE,
  decreaseQuantity: ACTION_STATUS.IDLE,
  removeFromCartStatus: ACTION_STATUS.IDLE,
};

export const getCart = createAsyncThunk(
  'cart/get',
  async () => {
    return await cartApi.get();
  }
);

export const addToCart = createAsyncThunk(
  'cart/add',
  async (item) => {
    return await cartApi.addToCart(item);
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/remove',
  async (itemId) => {
    return await cartApi.removeFromCart(itemId);
  }
);

export const decreaseQuantity = createAsyncThunk(
  'cart/decrease',
  async (itemId) => {
    return await cartApi.decreaseByOne(itemId);
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    refresh: (state) => {
      state.addToCartStatus = ACTION_STATUS.IDLE;
      state.removeFromCartStatus = ACTION_STATUS.IDLE;
      state.decreaseQuantity = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder


      .addCase(getCart.pending, (state) => {
        state.getCartStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.getCartStatus = ACTION_STATUS.SUCCEEDED;
        state.cart = action.payload;
      })
      .addCase(getCart.rejected, (state) => {
        state.getCartStatus = ACTION_STATUS.FAILED;
      })



      .addCase(addToCart.pending, (state) => {
        state.addToCartStatus = ACTION_STATUS.LOADING;
      })
      .addCase(addToCart.fulfilled, (state) => {
        state.addToCartStatus = ACTION_STATUS.SUCCEEDED;
      })
      .addCase(addToCart.rejected, (state) => {
        state.addToCartStatus = ACTION_STATUS.FAILED;
      })



      .addCase(removeFromCart.pending, (state) => {
        state.removeFromCartStatus = ACTION_STATUS.LOADING;
      })
      .addCase(removeFromCart.fulfilled, (state) => {
        state.removeFromCartStatus = ACTION_STATUS.SUCCEEDED;
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.removeFromCartStatus = ACTION_STATUS.FAILED;
      })



      .addCase(decreaseQuantity.pending, (state) => {
        state.decreaseQuantity = ACTION_STATUS.LOADING;
      })
      .addCase(decreaseQuantity.fulfilled, (state) => {
        state.decreaseQuantity = ACTION_STATUS.SUCCEEDED;
      })
      .addCase(decreaseQuantity.rejected, (state) => {
        state.decreaseQuantity = ACTION_STATUS.FAILED;
      })
  }
});

const { reducer, actions } = cartSlice;

export const { refresh } = actions;

export default reducer;
