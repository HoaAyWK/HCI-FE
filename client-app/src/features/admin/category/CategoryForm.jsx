import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';

import { FormProvider, RHFSelect, RHFTextField } from '../../../components/hook-form';

const status = [
  { id: 1, name: 'Available' },
  { id: 2, name: 'Unavailable' }
];

const CategoryForm = (props) => {
  const { dialogTitle, dialogContent, open, handleClose, isEdit } = props;
  const CategorySchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    status: Yup.string(),
  });

  const defaultValues = {
    name: '',
    status: status[0].id
  };

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <RHFTextField name='name' label='Name' />
            <RHFSelect name='status' data={status} label='Status' id='status' />
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

export default CategoryForm;