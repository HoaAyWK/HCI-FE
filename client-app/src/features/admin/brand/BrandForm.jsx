import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';
import { useSnackbar } from 'notistack';

import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { refresh } from './brandSlice';
import ACTION_STATUS from '../../../constants/actionStatus';

const BrandForm = (props) => {
  const { dialogTitle, dialogContent, open, handleClose, isEdit, action, status } = props;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const CategorySchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
  });

  const defaultValues = {
    name: '',
  };

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    try {
      const actionResult = await dispatch(action(data));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar(`${isEdit ? 'Updated' : 'Created'} successfully`);
        dispatch(refresh());
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      {dialogContent && (<DialogContent>{dialogContent}</DialogContent>)}
      <Box sx={{ p: 2 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <RHFTextField name='name' label='Name' />
          </Stack>
        </FormProvider>
      </Box>
      <DialogActions>
        <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
          <Button variant='contained' color='inherit' onClick={handleClose}>Cancel</Button>
          <LoadingButton
            variant='contained'
            color='primary'
            type='submit'
            loading={status === ACTION_STATUS.LOADING ? true : false}
          >
            {isEdit ? 'Update' : 'Create' }
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default BrandForm;
