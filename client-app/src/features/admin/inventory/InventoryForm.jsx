import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack, Grid, Typography } from '@mui/material';

import { FormProvider, RHFTextField } from '../../../components/hook-form';

const InventoryForm = (props) => {
  const { dialogTitle, dialogContent, open, handleClose, isEdit, inventory } = props;

  const InventorySchema = Yup.object().shape({
    quantity: Yup.number()
      .required('Quantity is required')
      .moreThan(0, 'Quantity must be more than 0')
  });

  const defaultValues = inventory;

  const methods = useForm({
    resolver: yupResolver(InventorySchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      {dialogContent && (<DialogContent>{dialogContent}</DialogContent>)}
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <Typography variant='body1'>Product Id: {inventory.productId}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body1'>Product Name: {inventory.productName}</Typography>
          </Grid>
        </Grid>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <RHFTextField name='quantity' type='number' label='Quantity' />
          </Stack>
        </FormProvider>
      </Box>
      <DialogActions>
        <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
          <Button variant='contained' color='inherit' onClick={handleClose}>Cancel</Button>
          <LoadingButton variant='contained' color='primary' type='submit'>
            {isEdit ? 'Update' : 'Create' }
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default InventoryForm;
