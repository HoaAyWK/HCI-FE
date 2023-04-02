import React, { useState } from 'react';
import {
  Box,
  Checkbox,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Tooltip,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { Iconify, QuantityControl } from '../../../../components';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  'td, th': {
    border: 0
  }
}));

const LineItem = ({ item, selected, handleClick }) => {
  const { name, price, quantity, image } = item;
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const selectedRow = selected.indexOf(name) !== -1;

  const handleIncreaseQuantity = () => {
    setItemQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setItemQuantity(prev => prev - 1);
  };

  return (
    <StyledTableRow tabIndex={-1} role='checkbox' selected={selectedRow}>
      <TableCell padding='checkbox'>
        <Checkbox checked={selectedRow} onChange={(e) => handleClick(e, name)} />
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
              borderRadius: '8px'
            }}
          />
          <Typography variant='subtitle2'>
            {name}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align='right'>{price}</TableCell>
      <TableCell align='right'>
        <QuantityControl
          quantity={itemQuantity}
          increaseQuantity={handleIncreaseQuantity}
          decreaseQuantity={handleDecreaseQuantity}
        />
      </TableCell>
      <TableCell align='right'>{price * itemQuantity}</TableCell>

      <TableCell align='right'>
        <Tooltip title='Delete'>
          <IconButton>
            <Iconify icon='eva:trash-2-outline' width={24} height={24} />
          </IconButton>
        </Tooltip>
      </TableCell>
    </StyledTableRow>
  );
};

export default LineItem;
