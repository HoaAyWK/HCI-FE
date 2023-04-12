import React from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack, Typography, Rating } from '@mui/material';

import ACTION_STATUS from '../../constants/actionStatus';
import { FormProvider, RHFEditor, RHFRating } from '../../components/hook-form';

const ProductReviewDialog = (props) => {
  const { dialogTitle, dialogContent, open, handleClose, isEdit, action, status } = props;

  const ReviewSchema = Yup.object().shape({
    rating: Yup.number()
      .required('Rating is required'),
    content: Yup.string()
      .required('Content is required')
  });

  const defaultValues = {
    rating: 0,
    content: ''
  };

  const methods = useForm({
    resolver: yupResolver(ReviewSchema),
    defaultValues
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth='md'>
      <DialogTitle>{dialogTitle}</DialogTitle>
      {dialogContent && (<DialogContent>{dialogContent}</DialogContent>)}
      <Box sx={{ p: 2 }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant='body1'>Your review about this product:</Typography>
              <RHFRating name='rating' />
            </Box>
            <RHFEditor name='content' label='Content' />
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
            {isEdit ? 'Update Review' : 'Post Review' }
          </LoadingButton>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default ProductReviewDialog;
