import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';

import { ProductFavorite } from './components';
import { Page } from '../../../components';

const favorites = [
  {
    id: 1,
    name: 'MacBook Air M1 2020',
    image: 'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80',
    numOfFavorites: 200
  },
  {
    id: 2,
    name: 'ThinkPad T14',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
    numOfFavorites: 145
  },
  {
    id: 3,
    name: 'ThinkPad E490',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    numOfFavorites: 356
  },
]

const ProfileFavorites = () => {
  return (
    <Page title='Product favorites'>
      <Typography variant='h6' component='h1'>
        My Favorites
      </Typography>
      <Stack sx={{ my: 3 }} spacing={3}>
        {favorites.map((favorite, index) => (
          <>
            <ProductFavorite key={favorite.id} product={favorite} />
            {index < favorites.length - 1 && (
              <Divider />
            )}
          </>
        ))}
      </Stack>
    </Page>
  );
};

export default ProfileFavorites;
