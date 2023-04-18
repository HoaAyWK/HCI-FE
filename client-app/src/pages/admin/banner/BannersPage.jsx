import React, { useState } from 'react';
import { Grid } from '@mui/material';

import { AdminPageLayout } from '../common';
import { SecondaryBannerList, MainBannerList } from '../../../features/admin/banner';
import BannerForm from '../../../features/admin/banner/BannerForm';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Banner', path: '/admin/banners' },
  { label: 'Management' },
];

const BannersPage = () => {
  const [openMainBannerForm, setOpenMainBannerForm] = useState(false);
  const [openSubBannerForm, setOpenSubBannerForm] = useState(false);

  const handleOpenMainBannerForm = () => {
    setOpenMainBannerForm(true);
  };

  const handleCloseMainBannerForm = () => {
    setOpenMainBannerForm(false);
  };

  const handleCloseSubBannerForm = () => {
    setOpenSubBannerForm(false);
  };

  const handleOpenSubBannerForm = () => {
    setOpenSubBannerForm(true);
  };

  return (
    <AdminPageLayout
      pageTitle='Banners management'
      pageHeaderName='Banners management'
      breadcrumbs={breadcrumbs}
      showCreateButton={false}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <MainBannerList onOpenAddDialog={handleOpenMainBannerForm} />
        </Grid>
        <Grid item xs={12} md={5}>
          <SecondaryBannerList onOpenAddDialog={handleOpenSubBannerForm} />
        </Grid>
      </Grid>
      <BannerForm
        open={openMainBannerForm}
        handleClose={handleCloseMainBannerForm}
        imagePosition='main'
        dialogTitle='Add main banner'
        dialogContent='Add a new main banner'
      />
      <BannerForm
        open={openSubBannerForm}
        handleClose={handleCloseSubBannerForm}
        imagePosition='sub'
        dialogTitle='Add sub banner'
        dialogContent='Add a new sub banner'
      />
    </AdminPageLayout>
  );
};

export default BannersPage;
