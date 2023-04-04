import React from 'react';
import { TableRow, TableCell, Stack, Box, Typography, Icon } from '@mui/material';

import { Iconify } from '../../../components';

const LineItem = ({ item, index }) => {
  const { name, image, quantity, price } = item;
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
            alt={name}
            sx={{
              width: 56,
              height: 56,
              objectFit: 'cover',
              borderRadius: 1,
              my: 1
            }}
          />
          <Stack spacing={1}>
            <Typography variant='subtitle2'>
              {name}
            </Typography>
            {/* <Stack spacing={1} direction='row'>
              <Iconify icon='fluent-mdl2:quantity' width={20} heiht={20} />
            </Stack> */}
          </Stack>
        </Stack>
      </TableCell>

      <TableCell align='right'>
        {quantity}
      </TableCell>
      <TableCell align='right'>{price}</TableCell>
      <TableCell align='right'>{price * quantity}</TableCell>
    </TableRow>
  );
};

export default LineItem;
