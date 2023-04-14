import React from 'react';
import { useSelector } from 'react-redux';

import { AdminPageLayout } from '../common';
import { ProductOriginForm } from '../../../features/admin/product-origin';
import { createProductOrigin } from '../../../features/admin/product-origin/productOriginSlice';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Product Origin', path: '/admin/product-origins' },
  { label: 'Create' }
];

const CreateProductPage = () => {
  const { createProductOriginStatus } = useSelector((state) => state.adminProductOrigins);

  return (
    <AdminPageLayout
      pageTitle='Create a new product origin'
      pageHeaderName='Create product origin'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <ProductOriginForm isEdit={false} action={createProductOrigin} status={createProductOriginStatus} />
    </AdminPageLayout>
  );
};

export default CreateProductPage;
