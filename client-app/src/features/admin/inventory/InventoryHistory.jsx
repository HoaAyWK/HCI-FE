import React from 'react';
import { Box, Stack, Typography } from '@mui/material';

const inventoryHistories = [
  { createdAt: '04/04/2023 09:12 AM', isIncrease: false, value: 5 },
  { createdAt: '04/04/2023 07:48 AM', isIncrease: false, value: 2 },
  { createdAt: '03/04/2023 17:20 PM', isIncrease: false, value: 4 },
  { createdAt: '04/04/2023 20:57 PM', isIncrease: true, value: 20 },
  { createdAt: '04/04/2023 10:15 AM', isIncrease: false, value: 1 },
];

const InventoryHistory = () => {
  return (
    <Box sx={{ px: 1 }}>
      <Typography variant='h5' component='h1' color='text.primary'>
         #129120
      </Typography>
      <Stack spacing={2} sx={{ mt: 2 }}>
        {inventoryHistories.map((ih) => (
          <Box
            key={ih.createdAt}
            sx={{
              display: 'flex',
              alginItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Typography variant='body1'>{ih.createdAt}</Typography>
            <Typography variant='body1'>{`${ih.isIncrease ? '+' : '-'}${ih.value}`}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default InventoryHistory;
