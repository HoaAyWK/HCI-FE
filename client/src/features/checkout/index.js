import React, { useState } from 'react';
import { Box, Grid, Stack, Step, StepLabel, Stepper } from '@mui/material';

import BillingAndAddress from './BillingAndAddress';
import Cart from './cart';
import OrderSummary from './OrderSummary';
import { BillingAddress } from './components';
import PaymentOptions from './PaymentOptions';

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
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep(prevStep => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

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
          <Cart step={activeStep} />
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
            <OrderSummary step={activeStep} onNext={handleNext} onClickEdit={() => setActiveStep(0)} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default Checkout;
