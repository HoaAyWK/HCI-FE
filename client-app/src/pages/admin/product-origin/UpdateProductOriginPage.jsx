import React from 'react';
import { useParams } from 'react-router-dom';

import { AdminPageLayout } from '../common';
import { UpdateProductOriginForm } from '../../../features/admin/product-origin';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Product Origin', path: '/admin/product-origins' },
  { label: 'Update' }
];

const UpdateProductOriginPage = () => {
  const { id } = useParams();

  return (
    <AdminPageLayout
      pageTitle='Create a new product origin'
      pageHeaderName='Create product origin'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <UpdateProductOriginForm productId={id} />
    </AdminPageLayout>
  );
};

export default UpdateProductOriginPage;
