import React, { useState } from 'react';

import { AdminPageLayout } from '../common';
import { BrandList, BrandForm } from '../../../features/admin/brand';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Brand', path: '/admin/brands' },
  { label: 'List' },
];

const BrandListPage = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <AdminPageLayout
      pageTitle='Brands'
      pageHeaderName='Brands'
      showCreateButton={true}
      createWithDialog={true}
      createName='Brand'
      onOpenDialog={handleOpenDialog}
      breadcrumbs={breadcrumbs}
    >
      <BrandList />
      <BrandForm
        dialogTitle='Create Brand'
        dialogContent='Create a new brand'
        isEdit={false}
        open={openDialog}
        handleClose={handleCloseDialog}
      />
    </AdminPageLayout>
  );
};

export default BrandListPage;
