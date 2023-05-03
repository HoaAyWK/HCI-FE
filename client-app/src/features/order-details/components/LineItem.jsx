import React, { useState } from 'react';
import { TableRow, TableCell, Stack, Box, Typography, IconButton, Tooltip } from '@mui/material';

import { fCurrency } from '../../../utils/formatNumber';
import { Iconify } from '../../../components';
import { ProductReviewDialog } from '../../common/product-reviews';
import { STATUS } from '../../../constants/orderStatus';

const LineItem = ({ item, index, status }) => {
  const { productName, image, quantity, productPrice, reviewed, id } = item;
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <TableRow>
      <TableCell>
        {index + 1}
      </TableCell>
      <TableCell component='th' scope='row' padding='none'>
        <Stack direction='row' spacing={2} alignItems='center'>
          <Box
            component='img'
            src={image}
            alt={productName}
            sx={{
              width: 56,
              height: 56,
              objectFit: 'cover',
              borderRadius: 1,
              my: 1
            }}
          />
          <Stack spacing={1} direction='row' alignItems='center'>
            <Typography variant='subtitle2'>
              {productName}
            </Typography>
            {!reviewed && status !== STATUS.CANCELLED && status !== STATUS.PROCESSING && (
              <Tooltip title='Click to review the product.' onClick={handleOpenDialog}>
                <IconButton size='small' color='warning'>
                  <Iconify icon='material-symbols:release-alert-rounded' width={20} height={20} />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        </Stack>
        <ProductReviewDialog
          dialogTitle={`Write review for '${productName}'`}
          open={openDialog}
          handleClose={handleCloseDialog}
          orderId={id}
        />
      </TableCell>

      <TableCell align='right'>
        {quantity}
      </TableCell>
      <TableCell align='right'>{fCurrency(productPrice)}</TableCell>
      <TableCell align='right'>{fCurrency(productPrice * quantity)}</TableCell>
    </TableRow>
  );
};

export default LineItem;
