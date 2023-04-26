import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getBanners, selectAllBanners } from './banners/bannerSlice';
import { selectProductDetailWithImage, getProductDetails } from '../common/productDetailsSlice';
import Banners from './banners/Banners';
import ProductListSection from './ProductListSection';
import ACTION_STATUS from '../../constants/actionStatus';
import { BannersSkeleton } from './banners/components';
import ProductListSectionSkeleton from './components/ProductListSectionSkeleton';
import { SomethingWentWrong } from '../common/components';

const Home = () => {
  const dispatch = useDispatch();
  const banners = useSelector(selectAllBanners);
  const products = useSelector(selectProductDetailWithImage);
  const { getBannersStatus } = useSelector((state) => state.banners);
  const { getProductDetailsStatus } = useSelector((state) => state.productDetails);

  useEffect(() => {
    if (getBannersStatus === ACTION_STATUS.IDLE) {
      dispatch(getBanners());
    }

    if (getProductDetailsStatus === ACTION_STATUS.IDLE) {
      dispatch(getProductDetails());
    }
  }, []);

  if (getBannersStatus === ACTION_STATUS.IDLE ||
      getBannersStatus === ACTION_STATUS.LOADING ||
      getProductDetailsStatus === ACTION_STATUS.IDLE ||
      getProductDetailsStatus === ACTION_STATUS.LOADING) {
    return (
      <>
        <BannersSkeleton />
        <ProductListSectionSkeleton />
      </>
    );
  }

  if (getBannersStatus === ACTION_STATUS.FAILED ||
      getProductDetailsStatus === ACTION_STATUS.FAILED) {
    return <SomethingWentWrong />;
  }

  return (
    <>
      <Banners banners={banners} />
      <ProductListSection products={products} />
    </>
  );
};

export default Home;
