import React from 'react';

import { AdminPageLayout } from '../common';
import { ProductForm } from '../../../features/admin/product';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Product', path: '/admin/product' },
  { label: 'Create' }
];

const CreateProductPage = () => {
  return (
    <AdminPageLayout
      pageTitle='Create a new product'
      pageHeaderName='Create product'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <ProductForm />
    </AdminPageLayout>
  );
};

export default CreateProductPage;
