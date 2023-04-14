import React, { useState } from 'react';
import { TableRow,TableCell, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

import { Label } from '../../../components';
import { MoreMenu, MoreMenuItem } from '../../../components/table';
import { updateCategory } from './categorySlice';
import CategoryForm from './CategoryForm';

const CategoryLine = ({ category }) => {
  const { name, status } = category;
  const [openEdit, setOpenEdit] = useState(false);
  const { updateCategoryStatus } = useSelector((state) => state.adminCategories);


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
          <Label color={ status === true ? 'success' : 'error' }>{status ? 'Available' : 'Unavailable'}</Label>
        </TableCell>
        {/* <TableCell align='right'>
          {numberOfProducts}
        </TableCell> */}
        <TableCell align="right">
          <MoreMenu>
            <MoreMenuItem title='Edit' iconName='eva:edit-outline' handleClick={handleClickOpenEdit} />
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
        category={category}
      />
    </>
  );
};

export default CategoryLine;
