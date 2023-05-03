import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';

import { getBanners, selectAllBanners } from './banners/bannerSlice';
import { selectProductDetailWithImage, getBestSellers } from '../common/productDetailsSlice';
import Banners from './banners/Banners';
import ProductListSection from './ProductListSection';
import ACTION_STATUS from '../../constants/actionStatus';
import { BannersSkeleton } from './banners/components';
import ProductListSectionSkeleton from './components/ProductListSectionSkeleton';
import { SomethingWentWrong } from '../common/components';
import { getMyFavorites, selectAllFavorites } from '../common/productFavoriteSlice';
import { Button } from '@mui/material';

const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(2);
  const banners = useSelector(selectAllBanners);
  const products = useSelector(selectProductDetailWithImage);
  const { getBannersStatus } = useSelector((state) => state.banners);
  const { getBestSellersStatus, totalItems } = useSelector((state) => state.productDetails);
  const { user } = useSelector((state) => state.auth);
  const favorites = useSelector(selectAllFavorites);
  const { getFavoritesStatus } = useSelector((state) => state.favorites);

  const canShowmore = useMemo(() => {
    if (page * perPage < totalItems) {
      return true;
    }

    return false;
  }, [totalItems, page, perPage]);

  const productsToShow = useMemo(() => {
    if (products) {
      return products.slice(0, perPage * page);
    }
  }, [products, page, perPage]);

  useEffect(() => {
    if (getBannersStatus === ACTION_STATUS.IDLE) {
      dispatch(getBanners());
    }

    if (getBestSellersStatus === ACTION_STATUS.IDLE) {
      dispatch(getBestSellers({ num: perPage, page: 1 }));
    }

  }, []);

  useEffect(() => {
    if (getFavoritesStatus === ACTION_STATUS.IDLE && user) {
      dispatch(getMyFavorites());
    }
  }, [user]);

  const handleClickShowmore = () => {
    setPage(prev => prev + 1);
  };

  if (getBannersStatus === ACTION_STATUS.IDLE ||
      getBannersStatus === ACTION_STATUS.LOADING ||
      getBestSellersStatus === ACTION_STATUS.IDLE ||
      getBestSellersStatus === ACTION_STATUS.LOADING) {
    return (
      <>
        <BannersSkeleton />
        <ProductListSectionSkeleton />
      </>
    );
  }

  if (getBannersStatus === ACTION_STATUS.FAILED ||
      getBestSellersStatus === ACTION_STATUS.FAILED) {
    return <SomethingWentWrong />;
  }

  return (
    <>
      <Banners banners={banners} />
      <ProductListSection title='Best Seller' products={productsToShow} favorites={favorites} />
      {canShowmore && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 1,
            mb: 3
          }}
        >
          <Button variant='outlined' onClick={handleClickShowmore}>Show more</Button>
        </Box>
      )}
    </>
  );
};

export default Home;
