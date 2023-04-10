import React, { useState } from 'react';

import { AdminPageLayout } from '../common';
import { CategoryList, CategoryForm } from '../../../features/admin/category';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Product', path: '/admin/categories' },
  { label: 'List' },
];

const CategoryListPage = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <AdminPageLayout
      pageTitle='Categories'
      pageHeaderName='Categories'
      showCreateButton={true}
      createWithDialog={true}
      createName='Category'
      onOpenDialog={handleOpenDialog}
      breadcrumbs={breadcrumbs}
    >
      <CategoryList />
      <CategoryForm
        dialogTitle='Create Category'
        dialogContent='Create a new category'
        isEdit={false}
        open={openDialog}
        handleClose={handleCloseDialog}
      />
    </AdminPageLayout>
  );
};

export default CategoryListPage;
