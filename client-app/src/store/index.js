import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../features/auth/authSlice';
import adminCategoryReducer from '../features/admin/category/categorySlice';
import adminBrandReducer from '../features/admin/brand/brandSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminBrands: adminBrandReducer,
    adminCategories: adminCategoryReducer,
  }
});
