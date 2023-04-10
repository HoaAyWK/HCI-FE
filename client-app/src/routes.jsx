import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { AccountSettings, AdminSettings, PasswordSettings } from './features/settings';
import { Login, Register } from './features/auth';

import { AdminLayout, MainLayout, SettingsLayout } from './layouts';

import { HomePage, CheckoutPage, ProductsPage, ProductPage, ProfilePage, SearchPage, OrderDetailsPage } from './pages';
import { DashboardPage } from './pages/admin';
import { CreateProductPage, ProductListPage } from './pages/admin/product';
import { CreateUserPage, UserListPage, UserDetailsPage } from './pages/admin/user';
import AHome from './features/home/AHome';
import { CategoryListPage } from './pages/admin/category';

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
      path: 'login',
      element: <Login />
    },
    {
      path: 'sign-up',
      element: <Register />
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
            }
          ]
        },
        {
          path: 'categories',
          element: <CategoryListPage />
        }
      ]
    }
  ]);
};

export default Router;
