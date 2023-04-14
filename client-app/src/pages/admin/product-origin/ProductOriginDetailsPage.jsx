import React from 'react';

import { AdminPageLayout } from '../common';
import { ProductOriginDetails } from '../../../features/admin/product-origin';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Product Origin', path: '/admin/product-origins' },
  { label: 'Details' },
];

const ProductOriginDetailsPage = () => {
  return (
    <AdminPageLayout
      pageTitle='Product origin details'
      pageHeaderName='Product origin details'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <ProductOriginDetails />
    </AdminPageLayout>
  );
};

export default ProductOriginDetailsPage;
