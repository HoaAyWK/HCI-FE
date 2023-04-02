import React from 'react';
import { Box, Button, Stack } from '@mui/material';

import { BillingAddress } from './components';
import { Iconify } from '../../components';

const BillingAndAddress = ({ addresses, step, onNext, onBack }) => {
  return (
    <Box sx={{ display: step === 1 ? 'block' : 'none' }}>
      <Stack spacing={2}>
        {addresses.map((address) => (
          <BillingAddress key={address.name} item={address} onSelectAddress={onNext} />
        ))}
      </Stack>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 2
        }}
      >
        <Button color='inherit' onClick={onBack}>
          <Iconify icon='material-symbols:arrow-back-ios-new' width={16} height={16} />
          &nbsp;
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default BillingAndAddress;
