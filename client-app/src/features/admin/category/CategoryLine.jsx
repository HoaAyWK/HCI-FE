import React, { useState } from 'react';
import { TableRow,TableCell } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';

import { Label } from '../../../components';
import { MoreMenu, MoreMenuItem } from '../../../components/table';
import { deleteCategory, updateCategory } from './categorySlice';
import CategoryForm from './CategoryForm';

const CategoryLine = ({ category }) => {
  const { id, name, status, numberOfProducts } = category;
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { updateCategoryStatus } = useSelector((state) => state.adminCategories);

  const handleClickDelete = async (id) => {
    try {
      const actionResult = await dispatch(deleteCategory(id));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar('Deleted successfully', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleClickOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
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
        <TableCell>
          <Label color={ status === 'Available' ? 'success' : 'error' }>{status}</Label>
        </TableCell>
        <TableCell align='right'>
          {numberOfProducts}
        </TableCell>
        <TableCell align="right">
          <MoreMenu>
            <MoreMenuItem title='Edit' iconName='eva:edit-outline' handleClick={handleClickOpenEdit} />
            <MoreMenuItem title="Delete" iconName="eva:trash-2-outline" handleClick={handleClickDelete} id={id}/>
          </ MoreMenu>
        </TableCell>
      </TableRow>
      <CategoryForm
        isEdit={true}
        dialogTitle={'Edit Category'}
        open={openEdit}
        handleClose={handleCloseEdit}
        action={updateCategory}
        actionStatus={updateCategoryStatus}
      />
    </>
  );
};

export default CategoryLine;
