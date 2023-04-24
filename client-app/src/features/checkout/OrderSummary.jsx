import React, { useMemo } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';

import { Iconify } from '../../components';
import { fCurrency } from '../../utils/formatNumber';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const OrderLine = ({ label, value, color, typoVariant }) => {
  return (
    <StyledBox>
      <Typography variant={typoVariant ? typoVariant : 'body2' } color='text.secondary'>{label}</Typography>
      <Typography
        variant={typoVariant ? typoVariant : 'body2' }
        fontWeight='bold'
        color={color ? color : 'text.primary'}
      >
        {value}
      </Typography>
    </StyledBox>
  );
};

const OrderSummary = ({ step, onNext, onClickEdit, cart, numSelected }) => {
  const subTotal = useMemo(() => {
    if (!cart || !cart.cartItems) {
      return 0;
    }

    if (cart.cartItems) {{
      const initialValue = 0;
      return cart.cartItems.reduce(
        (sum, item) => item.status ?
          sum + item.quantity * (item.price - item.price * (item.discount / 100)) : 0, initialValue);
    }}
  }, [cart]);

  return (
    <Box sx={{ width: '100%', m: 0 }}>
      <Card>
        <CardContent>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6'>
              Order Summary
            </Typography>
            {step === 2 && (
              <Button size='small' color='primary' onClick={onClickEdit}>
                <Iconify icon='eva:edit-outline' width={20} height={20} />
                &nbsp;
                Edit
              </Button>
            )}
          </Box>

          <Stack spacing={1}>
            <OrderLine label='Sub Total' value={fCurrency(subTotal)} />
            <OrderLine label='Shipping' value='Free' />
          </Stack>
          <Divider sx={{ my: 2 }} />
          <StyledBox sx={{ mt: 2 }}>
            <Typography variant='body1' fontWeight='bold' color='text.primary'>
              Total
            </Typography>
            <Typography variant='body1' fontWeight='bold' color='error'>
            {fCurrency(subTotal)}
            </Typography>
          </StyledBox>
          <Box sx={{ width: '100%', mt: 1 }}>
            <Typography textAlign='right' fontStyle='italic' variant='body2'>
              (VAT included if applicable)
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {step === 0 &&  (
        <Box sx={{ width: '100%', mt: 4 }}>
          <Button
            color='primary'
            variant='contained'
            fullWidth size='large'
            onClick={onNext}
          >
            Checkout
          </Button>
        </Box>
      )}

      {step === 2 && (
        <Box sx={{ width: '100%', my: 4 }}>
        <Button
          color='primary'
          variant='contained'
          fullWidth size='large'
          onClick={onNext}
        >
          Complete Order
        </Button>
      </Box>
      )}
    </Box>
  );
};

export default OrderSummary;
