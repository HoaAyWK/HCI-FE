import React from 'react';
import { useRoutes } from 'react-router-dom';

import { ProfileOverview } from './features/profile';
import { AccountSettings, AdminSettings, PasswordSettings } from './features/settings';
import { Login, Register } from './features/auth';

import { MainLayout, SettingsLayout } from './layouts';

import { Home, Products, Product, Profile } from './pages';

const Router = () => {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'products', element: <Products /> },
        { path: 'products/:id', element: <Product />},
        { path: 'profile', element: <Profile /> },
        {
          path:'settings',
          element: <SettingsLayout />,
          children: [
            { path: '', element: <ProfileOverview /> },
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
