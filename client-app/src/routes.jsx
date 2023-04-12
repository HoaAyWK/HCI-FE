import React, { useEffect } from 'react';
import { Navigate, useRoutes, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AccountSettings, AdminSettings, PasswordSettings } from './features/settings';
import { Login, Register } from './features/auth';

import { AdminLayout, MainLayout, SettingsLayout } from './layouts';

import { HomePage, CheckoutPage, ProductsPage, ProductPage, ProfilePage, SearchPage, OrderDetailsPage } from './pages';
import { DashboardPage } from './pages/admin';
import { CreateProductPage, ProductListPage, UpdateProductPage } from './pages/admin/product';
import { CreateUserPage, UserListPage, UserDetailsPage } from './pages/admin/user';
import AHome from './features/home/AHome';
import { CategoryListPage } from './pages/admin/category';
import { BrandListPage } from './pages/admin/brand';
import { InventoryListPage } from './pages/admin/inventory';
import { AdminOrderDetailsPage, OrderListPage } from './pages/admin/order';

const RejectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Navigate to='/' /> : <Outlet />;
};

const Router = () => {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <AHome /> },
        { path: 'search', element: <SearchPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'products/:id', element: <ProductPage />},
        { path: 'profile', element: <ProfilePage /> },
        { path: 'checkout', element: <CheckoutPage /> },
        { path: 'orders/:id', element: <OrderDetailsPage /> },
        {
          path:'settings',
          element: <SettingsLayout />,
          children: [
            { path: '', element: <Navigate to='profile' /> },
            { path: 'profile', element: <AccountSettings /> },
            { path: 'password', element: <PasswordSettings /> },
            { path: 'admin', element: <AdminSettings /> },
          ]
        }
      ],
    },
    {
      path: 'admin',
      element: <AdminLayout />,
      children: [
        {
          path: '',
          element: <Navigate to='dashboard' />
        },
        {
          path: 'dashboard',
          element: <DashboardPage />
        },
        {
          path: 'users',
          children: [
            {
              path: '',
              element: <Navigate to='list' />
            },
            {
              path: 'list',
              element: <UserListPage />
            },
            {
              path: 'create',
              element: <CreateUserPage />
            },
            {
              path: 'details',
              element: <UserDetailsPage />
            }
          ]
        },
        {
          path: 'products',
          children: [
            {
              path: '',
              element: <Navigate to='list' />
            },
            {
              path: 'list',
              element: <ProductListPage />
            },
            {
              path: 'create',
              element: <CreateProductPage />
            },
            {
              path: 'edit',
              element: <UpdateProductPage />
            }
          ]
        },
        {
          path: 'categories',
          element: <CategoryListPage />
        },
        {
          path: 'brands',
          element: <BrandListPage />
        },
        {
          path: 'inventory',
          element: <InventoryListPage />
        },
        {
          path: 'orders',
          children: [
            { path: '', element: <Navigate to='list' /> },
            { path: 'list', element: <OrderListPage /> },
            { path: 'details', element: <AdminOrderDetailsPage /> }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'sign-up',
          element: <Register />
        },
      ]
    },
  ]);
};

export default Router;
