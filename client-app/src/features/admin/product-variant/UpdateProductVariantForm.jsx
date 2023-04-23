import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FullProductVariantForm from './FullProductVariantForm';
import { Loading, FetchDataErrorMessage } from '../components';
import ACTION_STATUS from '../../../constants/actionStatus';
import { getProductOrigins, selectAllProductOrigins } from '../product-origin/productOriginSlice';
import { updateProductVariant, getProductVariants, selectProductVariantById } from './productVariantSlice';

const UpdateProductVariantForm = ({ productVariantId }) => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProductOrigins);
  const productVariant = useSelector((state) => selectProductVariantById(state, productVariantId));
  const { updateProductVariantStatus, getProductVariantsStatus } = useSelector((state) => state.adminProductVariants);
  const { getProductOriginsStatus } = useSelector((state) => state.adminProductOrigins);

  useEffect(() => {
    if (getProductOriginsStatus === ACTION_STATUS.IDLE) {
      dispatch(getProductOrigins());
    }

    if (getProductVariantsStatus === ACTION_STATUS.IDLE) {
      dispatch(getProductVariants());
    }

  }, []);

  if (getProductOriginsStatus === ACTION_STATUS.IDLE ||
    getProductOriginsStatus === ACTION_STATUS.LOADING ||
    getProductVariantsStatus === ACTION_STATUS.IDLE ||
    getProductVariantsStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getProductOriginsStatus === ACTION_STATUS.FAILED ||
    getProductVariantsStatus === ACTION_STATUS.FAILED) {
    return <FetchDataErrorMessage />;
  }

  return (
    <FullProductVariantForm
      productOrigins={products}
      isEdit={false}
      action={updateProductVariant}
      status={updateProductVariantStatus}
      productVariant={productVariant}
    />
  );
};

export default UpdateProductVariantForm;
