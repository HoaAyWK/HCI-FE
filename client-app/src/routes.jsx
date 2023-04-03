import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { AccountSettings, AdminSettings, PasswordSettings } from './features/settings';
import { Login, Register } from './features/auth';

import { MainLayout, SettingsLayout } from './layouts';

import { HomePage, CheckoutPage, ProductsPage, ProductPage, ProfilePage, SearchPage } from './pages';
import AHome from './features/home/AHome';

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
    }
  ]);
};

export default Router;
