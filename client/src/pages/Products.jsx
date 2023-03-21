import React from 'react';
import { Box } from '@mui/material';

import { ProductList } from '../features/products';

const Products = () => {
  return (
    <Box sx={{ mt: 16 }}>
      <ProductList />
    </Box>
  )
};

export default Products;
