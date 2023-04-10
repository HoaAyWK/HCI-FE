import React from 'react';

import { AdminPageLayout } from '../common';
import OrderDetails from '../../../features/order-details';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Order', path: '/admin/orders' },
  { label: 'Order Details' },
];

const OrderDetailsPage = () => {
  return (
    <AdminPageLayout
      pageHeaderName='Order details'
      pageTitle='Order Details'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <OrderDetails />
    </AdminPageLayout>
  );
};

export default OrderDetailsPage;
