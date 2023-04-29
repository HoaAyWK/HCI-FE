import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit';

import ACTION_STATUS from '../../../../constants/actionStatus';
import commentApi from '../../../../services/commentApi';

const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState({
  getCommentsByProductStatus: ACTION_STATUS.IDLE,
  createCommentStatus: ACTION_STATUS.IDLE
});

const getCommentsByProduct = createAsyncThunk(
  'comments/product',
  async (id) => {
    return await commentApi.getByProduct(id);
  }
);

const createComment = createAsyncThunk(
  'comments/create',
  async (data) => {
    return await commentApi.create(data);
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    refresh: (state) => {
      state.createCommentStatus = ACTION_STATUS.IDLE;
    }
  },
  extraReducers: (builder) => {
    builder



      .addCase(getCommentsByProduct.pending, (state) => {
        state.getCommentsByProductStatus = ACTION_STATUS.LOADING;
      })
      .addCase(getCommentsByProduct.fulfilled, (state, action) => {
        state.getCommentsByProductStatus = ACTION_STATUS.SUCCEEDED;
        commentsAdapter.addMany(state, action.payload.comments);
      })
      .addCase(getCommentsByProduct.rejected, (state) => {
        state.getCommentsByProductStatus = ACTION_STATUS.FAILED;
      })



      .addCase(createComment.pending, (state) => {
        state.createCommentStatus = ACTION_STATUS.IDLE;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        commentsAdapter.addOne(state, action.payload);
      })
      .addCase(createComment.rejected, (state) => {
        state.createCommentStatus = ACTION_STATUS.FAILED;
      })
  }
});

export const {
  selectAll: selectAllComments
} = commentsAdapter.getSelectors(state => state.comments);

const { reducer, actions } = commentSlice;

export const { refresh } = actions;

export default reducer;

