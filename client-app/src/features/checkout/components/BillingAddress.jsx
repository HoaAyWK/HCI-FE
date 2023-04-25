import React from 'react';
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material';

import { Iconify, Label } from '../../../components';
import { useLocalStorage } from '../../../hooks';

const BillingAddress = ({ item, showTitle, onSelectAddress, onClickEdit, sx }) => {
  const { name, isDefault, address, phone } = item;
  const [shippingAddressId, setShippingAddressId] = useLocalStorage('shippingAddress', 'default');

  const handleSelectAddress = () => {
    setShippingAddressId(item.id);
    onSelectAddress();
  };

  return (
    <Card sx={{ ...sx }}>
      <CardContent>
        {showTitle && (
          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant='h6'>
              Billing Address
            </Typography>
            <Button color='primary' size='small' onClick={onClickEdit}>
              <Iconify icon='eva:edit-outline' width={20} height={20} />
              &nbsp;
              Edit
            </Button>
          </Box>
        )}
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Stack spacing={1} direction='row'>
              <Typography variant='body1' fontWeight='bold' color='text.primary'>
                {name}
              </Typography>
            </Stack>
            {isDefault && !showTitle && (<Label color='info' sx={{ ml: 2 }}>Default</Label>)}
          </Box>
          <Typography variant='body2' color='text.primary'>
            {address}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography variant='body2' color='text.secondary'>
              {phone}
            </Typography>
            {!showTitle && (
              <Stack spacing={1} direction='row'>
                {!isDefault && (
                  <Button color='inherit' variant='outlined' size='small'>
                    Delete
                  </Button>
                )}
                <Button variant='outlined' color='primary' size='small' onClick={handleSelectAddress}>
                  Deliver to this address
                </Button>
              </Stack>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default BillingAddress;
