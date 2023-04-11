import React, { useState } from 'react';
import { TableRow, TableCell, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { MoreMenu, MoreMenuItem } from '../../../components/table';
import InventoryForm from './InventoryForm';
import { updateInventory } from './inventorySlice';

const InventoryLine = ({ inventory }) => {
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const { productId, productName, quantity } = inventory;
  const { updateInventoryStatus } = useSelector((state) => state.adminInventories);

  const handleOpenEditDialog = () => {
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  return (
    <>
      <TableRow
        key={productId}
        hover
        tabIndex={-1}
      >
        <TableCell component='th' scope='row'>
          <Typography variant='body1'>#{productId}</Typography>
        </TableCell>
        <TableCell>
        <Typography variant='body1'>{productName}</Typography>
        </TableCell>
        <TableCell align='right'>
          {quantity}
        </TableCell>
        <TableCell align="right">
          <MoreMenu>
            <MoreMenuItem title='Edit' iconName='eva:edit-outline' handleClick={handleOpenEditDialog} />
            <MoreMenuItem title="Delete" iconName="eva:trash-2-outline"/>
          </ MoreMenu>
        </TableCell>
      </TableRow>

      <InventoryForm
        dialogTitle='Edit Inventory'
        isEdit={true}
        open={openEditDialog}
        handleClose={handleCloseEditDialog}
        inventory={inventory}
        action={updateInventory}
        status={updateInventoryStatus}
      />
    </>
  );
};

export default InventoryLine;
