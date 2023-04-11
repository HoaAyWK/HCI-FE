import React, { useState } from 'react';
import { TableRow, TableCell } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

import { deleteBrand, updateBrand } from './brandSlice';
import { MoreMenu, MoreMenuItem } from '../../../components/table';
import BrandForm from './BrandForm';

const BrandLine = ({ brand }) => {
  const { id, name } = brand;
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { updateBrandStatus } = useSelector((state) => state.adminBrands);

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickDelete = async (id) => {
    try {
      const actionResult = await dispatch(deleteBrand(id));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar('Deleted successfully', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  return (
    <>
      <TableRow
        key={name}
        hover
        tabIndex={-1}
      >
        <TableCell component='th' scope='row'>
          <Typography variant='body1'>{name}</Typography>
        </TableCell>
        <TableCell align="right">
          <MoreMenu>
            <MoreMenuItem title='Edit' iconName='eva:edit-outline' handleClick={handleOpenEdit} />
            <MoreMenuItem title="Delete" iconName="eva:trash-2-outline" handleClick={handleClickDelete} id={id}/>
          </ MoreMenu>
        </TableCell>
      </TableRow>
      <BrandForm
        dialogTitle='Edit Brand'
        open={openEdit}
        handleClose={handleCloseEdit}
        isEdit={true}
        action={updateBrand}
        status={updateBrandStatus}
      />
    </>
  );
};

export default BrandLine;
