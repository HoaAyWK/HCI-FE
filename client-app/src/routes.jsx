import React, { useEffect } from 'react';
import { Navigate, useRoutes, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Loading } from './components';
import ACTION_STATUS from './constants/actionStatus';
import ROLES from './constants/userRoles';
import { useLocalStorage } from './hooks';

import { Login, Register } from './features/auth';
import { AccountSettings, AdminSettings, PasswordSettings } from './features/settings';
import { AdminLayout, MainLayout, SettingsLayout } from './layouts';
import { getCurrentUserInfo } from './features/auth/authSlice';

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
  const dispatch = useDispatch();
  const [accessToken] = useLocalStorage('accessToken', null);
  const { getCurrentUserStatus, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
      dispatch(getCurrentUserInfo());
    }
  }, []);

  if (getCurrentUserStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getCurrentUserStatus === ACTION_STATUS.SUCCEEDED) {
    if (user?.role === ROLES.ADMIN) {
      return <Navigate to='/admin/dashboard' />;
    } else {
      return <Navigate to='/' />;
    }
  }

  return <Outlet />
};

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const [accessToken] = useLocalStorage('accessToken', null);
  const { getCurrentUserStatus } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
      dispatch(getCurrentUserInfo());
    }
  }, []);

  if (getCurrentUserStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getCurrentUserStatus === ACTION_STATUS.SUCCEEDED) {
    return <Outlet />;
  }

  if (getCurrentUserStatus === ACTION_STATUS.FAILED) {
    return <Navigate to='/' />;
  }

  if (accessToken) {
    return <Outlet />;
  }

  return <Navigate to='/' />;
};

const ProtectedAdminRoute = () => {
  const dispatch = useDispatch();
  const [accessToken] = useLocalStorage('accessToken', null);
  const { getCurrentUserStatus, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
      dispatch(getCurrentUserInfo());
    }
  }, []);

  if (!accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
    return <Navigate to='/' />;
  }

  if (accessToken && getCurrentUserStatus === ACTION_STATUS.IDLE) {
    return <Outlet />;
  }

  if (getCurrentUserStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getCurrentUserStatus === ACTION_STATUS.FAILED) {
    return <Navigate to='/' />;
  }

  return (getCurrentUserStatus === ACTION_STATUS.SUCCEEDED && user?.role === ROLES.ADMIN) ? <Outlet /> : <Navigate to='/' />;
};

const Router = () => {
  return useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '', element: <AHome /> },
        { path: 'search', element: <SearchPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'products/:id', element: <ProductPage />},
        { path: 'checkout', element: <CheckoutPage /> },
        {
          path: '',
          element: <ProtectedRoute />,
          children: [
            { path: 'profile', element: <ProfilePage /> },
            { path: 'orders/:id', element: <OrderDetailsPage /> },
            {
              path: 'settings',
              element: <SettingsLayout />,
              children: [
                { path: '', element: <Navigate to='profile' /> },
                { path: 'profile', element: <AccountSettings /> },
                { path: 'password', element: <PasswordSettings /> },
                { path: 'admin', element: <AdminSettings /> },
              ]
            },
          ]
        }
      ]
    },
    {
      path: 'admin',
      element: <ProtectedAdminRoute />,
      children: [
        {
          path: '',
          element: <AdminLayout />,
          children: [
            { path: '', element: <Navigate to='dashboard' /> },
            { path: 'dashboard', element: <DashboardPage /> },
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
