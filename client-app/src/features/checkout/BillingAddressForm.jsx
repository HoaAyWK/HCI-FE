import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, DialogContent, Stack, Typography, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { FormProvider, RHFTextField } from '../../components/hook-form';

const BillingAddressForm = (props) => {
  const { open, handleClose, dialogTitle, dialogContent } = props;

  const ShippingAddressSchema = Yup.object().shape({
    fullName: Yup.string()
      .required('Full name is required'),
    address: Yup.string()
      .required('Address is required'),
    phone: Yup.string()
      .required('Phone is required')
  });

  const defaultValues = {
    fullName: '',
    address: '',
    phone: ''
  };

  const methods = useForm({
    resolver: yupResolver(ShippingAddressSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        {dialogContent && (<DialogContent>{dialogContent}</DialogContent>)}
        <Box sx={{ p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <RHFTextField name='fullName' label='Full name' />
              </Grid>
              <Grid item xs={12} md={6}>
                <RHFTextField name='phone' label='Phone number' />
              </Grid>
              <Grid item xs={12}>
                <RHFTextField name='address' label='Address' />
              </Grid>
            </Grid>
        </Box>
        <DialogActions>
          <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
            <Button variant='contained' color='inherit' onClick={handleClose}>Cancel</Button>
            <LoadingButton
              variant='contained'
              color='primary'
              type='submit'
            >
              Add
            </LoadingButton>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  )
}

export default BillingAddressForm
