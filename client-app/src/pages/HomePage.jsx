import React from "react";

import { Page } from "../components";
import { Banners, ProductListSection } from '../features/home';

const HomePage = () => {
  return (
    <Page title="Home">
      <Banners />
      <ProductListSection />
    </Page>
  );
};

export default HomePage;
