import React from 'react';
import { Grid } from '@mui/material';

import { AdminPageLayout } from '../common';
import { InventoryList, InventoryHistory } from '../../../features/admin/inventory';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Warehouse', path: '/admin/warehouse' },
  { label: 'List' },
];

const InventoryListPage = () => {

  return (
    <AdminPageLayout
      pageTitle='Warehouse List'
      pageHeaderName='Warehouse'
      showCreateButton={false}
      breadcrumbs={breadcrumbs}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <InventoryList />
        </Grid>
        <Grid item xs={12} md={4}>
          <InventoryHistory />
        </Grid>
      </Grid>
    </AdminPageLayout>
  );
};

export default InventoryListPage;
