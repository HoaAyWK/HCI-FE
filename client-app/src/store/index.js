import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../features/auth/authSlice';
import adminBrandReducer from '../features/admin/brand/brandSlice';
import adminCategoryReducer from '../features/admin/category/categorySlice';
import adminInventoryReducer from '../features/admin/inventory/inventorySlice';
import adminProductReducer from '../features/admin/product/productSlice';
import adminUserReducer from '../features/admin/user/userSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminBrands: adminBrandReducer,
    adminCategories: adminCategoryReducer,
    adminInventories: adminInventoryReducer,
    adminProdcuts: adminProductReducer,
    adminUsers: adminUserReducer,
  }
});
