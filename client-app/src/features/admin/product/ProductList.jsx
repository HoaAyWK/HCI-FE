import React, { useEffect, useState } from 'react';
import { Box, Stack, TableRow, TableCell, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

import { getComparator, applySortFilter } from '../../../utils/tableUtil';
import { DataTable } from '../components';
import { MoreMenuItemLink, MoreMenu, MoreMenuItem } from '../../../components/table';

import { getProducts, selectAllProducts, deleteProduct } from './productSlice';
import ACTION_STATUS from '../../../constants/actionStatus';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'price', label: 'Price', alignRight: true },
  { id: '', label: '', alignRight: false },
];

const PRODUCTS = [
  {
    id: '1',
    name: 'MacBook Pro M1 2020',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    price: 1299,
    description: 'Excepteur commodo sit nisi sit exercitation duis in. Tempor commodo deserunt cupidatat Lorem duis deserunt cupidatat fugiat commodo aliquip minim deserunt. Irure minim labore anim nulla consectetur sit esse.',
  },
  {
    id: '2',
    name: 'ThinkPad T14',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    price: 1499,
    description: 'Excepteur commodo sit nisi sit exercitation duis in. Tempor commodo deserunt cupidatat Lorem duis deserunt cupidatat fugiat commodo aliquip minim deserunt. Irure minim labore anim nulla consectetur sit esse.',
  },
  {
    id: '3',
    name: 'ThinkPad E490',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80',
    price: 999,
    description: 'Excepteur commodo sit nisi sit exercitation duis in. Tempor commodo deserunt cupidatat Lorem duis deserunt cupidatat fugiat commodo aliquip minim deserunt. Irure minim labore anim nulla consectetur sit esse.',
  },
  {
    id: '4',
    name: 'ThinkPad X1 Carbon',
    image: 'https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    price: 1599,
    description: 'Excepteur commodo sit nisi sit exercitation duis in. Tempor commodo deserunt cupidatat Lorem duis deserunt cupidatat fugiat commodo aliquip minim deserunt. Irure minim labore anim nulla consectetur sit esse.',
  },
  {
    id: '5',
    name: 'MacBook Air M2 2022',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    price: 1499,
    description: 'Excepteur commodo sit nisi sit exercitation duis in. Tempor commodo deserunt cupidatat Lorem duis deserunt cupidatat fugiat commodo aliquip minim deserunt. Irure minim labore anim nulla consectetur sit esse.',
  }
]

const ProductList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { getProductsStatus } = useSelector((state) => state.adminProducts);
  const products = useSelector(selectAllProducts);

  useEffect(() => {
    if (getProductsStatus === ACTION_STATUS.IDLE) {
      dispatch(getProducts());
    }
  }, [getProductsStatus]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickDelete = async (id) => {
    try {
      const actionResult = await dispatch(deleteProduct(id));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar('Deleted successfully', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar(error.message, {variant: 'error' });
    }
  };

  const filteredProducts = applySortFilter(PRODUCTS, getComparator(order, orderBy), filterName);

  return (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filteredProducts}
      tableHead={TABLE_HEAD}
      title='products'
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        const { id, name, price, description, image } = row;

        return (
          <TableRow
            key={id}
            hover
            tabIndex={-1}
          >
            <TableCell component='th' scope='row'>
              <Stack spacing={1} direction='row' alignItems='center'>
                <Box
                  component='img'
                  src={image}
                  alt={name}
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 1,
                    objectFit: 'cover'
                  }}
                />
                <Typography variant='body1'>{name}</Typography>
              </Stack>
            </TableCell>
            <TableCell sx={{ maxWidth: 400 }}>
              <Typography variant='body1' sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                {description}
              </Typography>
            </TableCell>
            <TableCell align='right'>
              ${price}
            </TableCell>
            <TableCell align="right">
              <MoreMenu>
                <MoreMenuItemLink title='Details' to='/admin/products/details' iconName='eva:eye-outline' />
                <MoreMenuItemLink title='Edit' to='/admin/products/edit' iconName='eva:edit-outline' />
                <MoreMenuItem title="Delete" iconName="eva:trash-2-outline" id={id} handleClick={handleClickDelete}/>

              </ MoreMenu>
            </TableCell>
          </TableRow>
        );
      })}
    </DataTable>
  );
};

export default ProductList;
