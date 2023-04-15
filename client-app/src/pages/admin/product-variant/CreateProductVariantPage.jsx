import React from 'react';
import { useSelector } from 'react-redux';

import { AdminPageLayout } from '../common';
import { ProductVariantForm } from '../../../features/admin/product-variant';
// import { createProduct } from '../../../features/admin/product/productSlice';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Product Variant', path: '/admin/product-variants' },
  { label: 'Create' }
];

const CreateProductVariantPage = () => {
  // const { createProductStatus } = useSelector((state) => state.adminProducts);

  return (
    <AdminPageLayout
      pageTitle='Create a new product'
      pageHeaderName='Create product'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <ProductVariantForm isEdit={false} />
    </AdminPageLayout>
  );
};

export default CreateProductVariantPage;
