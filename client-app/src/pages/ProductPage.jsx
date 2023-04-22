import React from 'react';

import { Page } from '../components';
import { ProductDetails } from '../features/products';

const ProductPage = () => {
  return (
    <Page title='Product details'>
      <ProductDetails />
    </Page>
  );
};

export default ProductPage;
