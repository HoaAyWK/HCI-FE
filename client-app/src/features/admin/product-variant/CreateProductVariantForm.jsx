import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductVariantForm from './ProductVariantForm';
import { Loading, FetchDataErrorMessage } from '../components';
import ACTION_STATUS from '../../../constants/actionStatus';
import { getProductOrigins, selectAllProductOrigins } from '../product-origin/productOriginSlice';

const CreateProductVariantForm = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProductOrigins);
  const { getProductOriginsStatus } = useSelector((state) => state.adminProductOrigins);

  useEffect(() => {
    if (getProductOriginsStatus === ACTION_STATUS.IDLE) {
      dispatch(getProductOrigins());
    }
  }, []);

  if (getProductOriginsStatus === ACTION_STATUS.IDLE ||
    getProductOriginsStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getProductOriginsStatus === ACTION_STATUS.FAILED) {
    return <FetchDataErrorMessage />;
  }

  return (
    <ProductVariantForm productOrigins={products} isEdit={false} />
  );
};

export default CreateProductVariantForm;
