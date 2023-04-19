import React, { useEffect, useMemo } from 'react';
import { Grid, Stack } from '@mui/material';

import { SecondaryBanner, MainBannerSlider, BannersSkeleton } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { getBanners, selectAllBanners } from './bannerSlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import { BANNER_POSITION } from '../../../constants/banner';

const IMAGES = [
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
  'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80',
];

const SECONDARY_IMAGES = [
  'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80',
];

const Banners = () => {
  const dispatch = useDispatch();
  const banners = useSelector(selectAllBanners);
  const { getBannersStatus } = useSelector((state) => state.banners);

  useEffect(() => {
    if (getBannersStatus === ACTION_STATUS.IDLE) {
      dispatch(getBanners());
    }
  }, [getBannersStatus]);

  const slideBanners = useMemo(() => {
    return banners.filter((banner) => banner?.field === BANNER_POSITION.MAIN);
  }, [banners]);

  const secondaryBanners = useMemo(() => {
    return banners.filter((banner) => banner?.field === BANNER_POSITION.SUB);
  }, [banners]);


  if (getBannersStatus === ACTION_STATUS.LOADING || getBannersStatus === ACTION_STATUS.IDLE) {
    return <BannersSkeleton />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <MainBannerSlider banners={slideBanners} />
      </Grid>
      <Grid item xs={12} md={5}>
        <Stack spacing={1}>
          {secondaryBanners.map((banner) => (
            <SecondaryBanner key={banner?.id} image={banner?.image} />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Banners;
