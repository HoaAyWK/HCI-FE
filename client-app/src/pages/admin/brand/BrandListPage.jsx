import React, { useState } from 'react';

import { AdminPageLayout } from '../common';
import { BrandList, BrandForm } from '../../../features/admin/brand';
import { createBrand } from '../../../features/admin/brand/brandSlice';
import { useSelector } from 'react-redux';
import ACTION_STATUS from '../../../constants/actionStatus';
import Loading from '../../../features/admin/common/components/Loading';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Brand', path: '/admin/brands' },
  { label: 'List' },
];

const BrandListPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { createBrandStatus } = useSelector((state) => state.adminBrands);

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
        action={createBrand}
        status={createBrandStatus}
      />
    </AdminPageLayout>
  );
};

export default BrandListPage;
