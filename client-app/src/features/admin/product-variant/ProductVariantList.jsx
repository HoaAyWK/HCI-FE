import React, { useEffect, useState } from 'react';
import { Box, Stack, TableRow, TableCell, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

import { Label } from '../../../components';
import { getComparator, applySortFilter } from '../../../utils/tableUtil';
import { DataTable, FetchDataErrorMessage, Loading } from '../components';
import { MoreMenuItemLink, MoreMenu, MoreMenuItem } from '../../../components/table';

import { selectAllProductVariants, getProductVariants } from './productVariantSlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import { COLOR_LIST } from '../../../constants/colors';

const TABLE_HEAD = [
  { id: 'name', label: 'Product Origin', alignRight: false },
  { id: 'specification', label: 'Specification', alignRight: false },
  { id: 'color', label: 'Color', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'price', label: 'Price', alignRight: true },
  { id: '', label: '', alignRight: false },
];

const ProductList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { getProductVariantsStatus } = useSelector((state) => state.adminProductVariants);
  const productVariants = useSelector(selectAllProductVariants);

  useEffect(() => {
    if (getProductVariantsStatus === ACTION_STATUS.IDLE) {
      dispatch(getProductVariants());
    }
  }, []);

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

  // const handleClickDelete = async (id) => {
  //   try {
  //     const actionResult = await dispatch(deleteProduct(id));
  //     const result = unwrapResult(actionResult);

  //     if (result) {
  //       enqueueSnackbar('Deleted successfully', { variant: 'success' });
  //     }
  //   } catch (error) {
  //     enqueueSnackbar(error.message, {variant: 'error' });
  //   }
  // };

  const filteredProducts = applySortFilter(productVariants, getComparator(order, orderBy), filterName);

  if (getProductVariantsStatus === ACTION_STATUS.IDLE ||
      getProductVariantsStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getProductVariantsStatus === ACTION_STATUS.FAILED) {
    return <FetchDataErrorMessage />;
  }

  return (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filteredProducts}
      tableHead={TABLE_HEAD}
      title='product variants'
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        const { id, name, price, specifications, color, status, media } = row;

        return (
          <TableRow
            key={id}
            hover
            tabIndex={-1}
          >
            <TableCell component='th' scope='row'>
              <Stack spacing={1} direction='row' alignItems='center'>
                {media?.length > 0 && (
                  <Box
                    component='img'
                    src={media?.[0]}
                    alt={name}
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 1,
                      objectFit: 'cover'
                    }}
                  />
                )}
                <Typography variant='body1'>{name}</Typography>
              </Stack>
            </TableCell>
            <TableCell>
              {specifications}
            </TableCell>
            <TableCell>
              {COLOR_LIST[color]}
            </TableCell>
            <TableCell>
              <Label color={status ? 'success' : 'error'}>{status ? 'Available' : 'Unavailable'}</Label>
            </TableCell>
            <TableCell align='right'>
              ${price}
            </TableCell>
            <TableCell align="right">
              <MoreMenu>
                <MoreMenuItemLink title='Details' to={`/admin/product-variants/details/${id}`} iconName='eva:eye-outline' />
                <MoreMenuItemLink title='Edit' to={`/admin/product-variants/edit/${id}`} iconName='eva:edit-outline' />
                <MoreMenuItem title="Delete" iconName="eva:trash-2-outline" id={id}/>

              </ MoreMenu>
            </TableCell>
          </TableRow>
        );
      })}
    </DataTable>
  );
};

export default ProductList;
