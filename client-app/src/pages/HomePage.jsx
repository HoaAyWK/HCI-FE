import React from "react";
import { Box } from '@mui/material';

import { Page } from "../components";
import { Banners, ProductListSection } from '../features/home';

const HomePage = () => {
  return (
    <Page title="Home">
      <Box sx={{ py: 2 }}>
        <Banners />
        <ProductListSection title='Best seller' />
        <ProductListSection title='Recommend for you' />
      </Box>
    </Page>
  );
};

export default HomePage;
