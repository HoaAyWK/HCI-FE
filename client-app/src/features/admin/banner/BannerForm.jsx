import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack } from '@mui/material';

import { FormProvider, RHFTextField } from '../../../components/hook-form';
import { BannerUploader } from './components';

const BannerForm = (props) => {
  const { dialogTitle, dialogContent, open, handleClose, imagePosition } = props;

  const BannerSchema = Yup.object().shape({
    position: Yup.string(),
    link: Yup.string()
      .required('Link is required'),
    image: Yup.mixed().required('Image is required')
  });

  const defaultValues = {
    link: '',
    position: imagePosition ? imagePosition : 'main',
    image: undefined
  };

  const methods = useForm({
    resolver: yupResolver(BannerSchema),
    defaultValues
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  const onDialogClose = () => {
    handleClose();
    reset();
  };

  return (
    <Dialog open={open} onClose={onDialogClose} fullWidth={true}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        {dialogContent && (<DialogContent>{dialogContent}</DialogContent>)}
        <Box sx={{ p: 2 }}>
            <RHFTextField type='hidden' name='id' sx={{ display: 'none' }}/>
            <Stack spacing={2}>
              <RHFTextField autoFocus name='link' label='Link' />
              <RHFTextField  name='position' label='Position' disabled />
              <BannerUploader name='image' label='Image' />
            </Stack>
        </Box>
        <DialogActions>
          <Stack spacing={1} direction='row' sx={{ mb: 1 }}>
            <Button variant='contained' color='inherit' onClick={onDialogClose}>Cancel</Button>
            <LoadingButton
              variant='contained'
              color='primary'
              type='submit'
            >
              Create
            </LoadingButton>
          </Stack>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
};

export default BannerForm;
