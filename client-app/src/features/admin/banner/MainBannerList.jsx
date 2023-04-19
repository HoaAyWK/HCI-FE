import React, { useEffect, useMemo } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

import Banner from './Banner';
import { useDispatch, useSelector } from 'react-redux';
import { getBanners, selectAllBanners } from './bannerSlice';
import { BANNER_POSITION } from '../../../constants/banner';
import ACTION_STATUS from '../../../constants/actionStatus';

// const IMAGES = [
//   'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
//   'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
//   'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
//   'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80',
// ];

const MainBannerList = ({ onOpenAddDialog }) => {
  const dispatch = useDispatch();
  const banners = useSelector(selectAllBanners);
  const { getBannersStatus } = useSelector((state) => state.adminBanners);

  useEffect(() => {
    if (getBannersStatus === ACTION_STATUS.IDLE) {
      dispatch(getBanners());
    }
  }, [getBannersStatus]);

  const mainBanners = useMemo(() => {
    return banners.filter((banner) => banner?.field === BANNER_POSITION.MAIN);
  }, [banners]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Typography variant='h4' component='h1' color='text.primary'>
          Slide banners
        </Typography>
        <Button variant='contained' color='primary' onClick={onOpenAddDialog}>Add</Button>
      </Box>
      <Grid container spacing={2}>
        {mainBanners.map((banner) => (
          <Grid item xs={12} sm={6} md={4} key={banner?.id}>
            <Banner image={banner?.image} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default MainBannerList;
