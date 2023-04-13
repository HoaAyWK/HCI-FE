import { configureStore } from "@reduxjs/toolkit";

import authReducer from '../features/auth/authSlice';
import adminBrandReducer from '../features/admin/brand/brandSlice';
import adminCategoryReducer from '../features/admin/category/categorySlice';
import adminInventoryReducer from '../features/admin/inventory/inventorySlice';
import adminProductReducer from '../features/admin/product/productSlice';
import adminUserReducer from '../features/admin/users/userSlice';
import adminOrderReducer from '../features/admin/order/orderSlice';
import accountReducer from '../features/settings/accountSlice';


export const store = configureStore({
  reducer: {
    auth: authReducer,
    account: accountReducer,
    adminBrands: adminBrandReducer,
    adminCategories: adminCategoryReducer,
    adminInventories: adminInventoryReducer,
    adminProducts: adminProductReducer,
    adminUsers: adminUserReducer,
    adminOrders: adminOrderReducer,
  }
});
