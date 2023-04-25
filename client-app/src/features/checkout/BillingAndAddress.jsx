import React, { useState } from 'react';
import { Box, Button, Stack } from '@mui/material';

import { BillingAddress } from './components';
import { Iconify } from '../../components';
import BillingAddressForm from './BillingAddressForm';

const BillingAndAddress = ({ addresses, step, onNext, onBack, user, onBackActiveStep }) => {
  const [openAddAddress, setOpenAddAddress] = useState(false);

  if (!user) {
    onBackActiveStep(0);
  }

  return (
    <Box sx={{ display: step === 1 ? 'block' : 'none' }}>
      <Stack spacing={2}>
        {user && (
          <BillingAddress
            item={{
              id: 'default',
              name: user.firstName + " " + user.lastName,
              address: user.address,
              phone: user.phone,
              isDefault: true
            }}
            onSelectAddress={onNext}
          />
        )}
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
        <Button color='primary' size='small' variant='contained' onClick={() => setOpenAddAddress(true)}>
          <Iconify icon='eva:plus-fill' width={20} height={20} />
          &nbsp;
          Add new address
        </Button>
      </Box>
      <BillingAddressForm
        dialogTitle='Add address'
        dialogContent='Add new shipping address'
        open={openAddAddress}
        handleClose={() => setOpenAddAddress(false)}
      />
    </Box>
  );
};

export default BillingAndAddress;
