import React, { useState, useEffect, useMemo } from 'react';
import { Box, CircularProgress, Grid, Stack, Step, StepLabel, Stepper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import BillingAndAddress from './BillingAndAddress';
import Cart from './cart';
import OrderSummary from './OrderSummary';
import { BillingAddress } from './components';
import PaymentOptions from './PaymentOptions';
import ACTION_STATUS from '../../constants/actionStatus';
import { getCart } from '../common/cartSlice';

const steps = [
  'Cart',
  'Billing & address',
  'Payment'
];

const ADDRESSES = [
  {
    name: 'Sioay',
    isDefault: true,
    address: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
    phone: '0391239781'
  },
  {
    name: 'Lucas Steve',
    isDefault: false,
    address: 'Di An, Binh Duong, Viet Nam',
    phone: '06293012801'
  },
  {
    name: 'Mike Williams',
    isDefault: false,
    address: '1 Vo Van Ngan stress, Thu Duc, Ho Chi Minh',
    phone: '0391239781'
  }
];

const Checkout = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const { getCartStatus, cart } = useSelector((state) => state.cart);

  const numSelected = useMemo(() => {
    if (!cart || !cart?.cartItems) {
      return 0;
    }

    if (cart.cartItems) {
      const initialValue = 0;
      return cart.cartItems.reduce((sum, item) => item.status ? sum + 1 : sum, initialValue);
    }
  }, [cart]);

  useEffect(() => {
    if (getCartStatus === ACTION_STATUS.IDLE) {
      dispatch(getCart());
    }
  }, []);

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  if (getCartStatus === ACTION_STATUS.IDLE ||
    getCartStatus === ACTION_STATUS.LOADING) {
    return (
      <Box
        sx={{
          width: '100%',
          py: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (getCartStatus === ACTION_STATUS.FAILED) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} md={8}>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((step) => (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={12} md={8}>
          <Cart step={activeStep} cart={cart} numSelected={numSelected} />
          <BillingAndAddress addresses={ADDRESSES} step={activeStep} onNext={handleNext} onBack={handleBack} />
          <PaymentOptions step={activeStep} onBack={handleBack} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {activeStep === 2 && (
              <BillingAddress
                showTitle={true}
                item={ADDRESSES[0]}
                onClickEdit={handleBack}
              />
            )}
            {numSelected > 0 && (
              <OrderSummary
                cart={cart}
                step={activeStep}
                onNext={handleNext}
                onClickEdit={() => setActiveStep(0)}
                numSelected={numSelected}
              />
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Checkout;
