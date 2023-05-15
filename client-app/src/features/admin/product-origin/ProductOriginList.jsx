import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, TableRow, TableCell, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';

import { getComparator, applySortFilter } from '../../../utils/tableUtil';
import { DataTable, FetchDataErrorMessage, Loading } from '../components';
import { MoreMenuItemLink, MoreMenu, MoreMenuItem } from '../../../components/table';

import { getProductOrigins, selectAllProductOrigins, deleteProductOrigin } from './productOriginSlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import { createMarkup } from '../../../utils/sanitizeHtml';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'information', label: 'Information', alignRight: false },
  { id: '', label: '', alignRight: false },
];

const ProductOriginList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { getProductOriginsStatus } = useSelector((state) => state.adminProductOrigins);
  const products = useSelector(selectAllProductOrigins);

  useEffect(() => {
    if (getProductOriginsStatus === ACTION_STATUS.IDLE) {
      dispatch(getProductOrigins());
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

  const handleClickDelete = async (id) => {
    try {
      const actionResult = await dispatch(deleteProductOrigin(id));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar('Deleted successfully', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar(error.message, {variant: 'error' });
    }
  };

  const filteredProducts = applySortFilter(products, getComparator(order, orderBy), filterName);

  if (getProductOriginsStatus === ACTION_STATUS.IDLE ||
      getProductOriginsStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getProductOriginsStatus === ACTION_STATUS.FAILED) {
    return <FetchDataErrorMessage />;
  }

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
        const { id, name, description, information } = row;

        return (
          <TableRow
            key={id}
            hover
            tabIndex={-1}
          >
            <TableCell align='left' sx={{ maxWidth: 300 }}>
              <Link component={RouterLink} to={`/admin/product-origins/details/${id}`} underline='hover'>
                <Typography
                  variant='body1'
                  sx={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {name}
                </Typography>
              </Link>
            </TableCell>
            <TableCell sx={{ maxWidth: 400 }}>
              <Typography
                variant='body1'
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',

                  '& p': {
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                  },
                  '& span': {
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    color: 'inherit !important',
                    backgroundColor: 'inherit !important',
                    width: 'auto'
                  },
                }}
                dangerouslySetInnerHTML={createMarkup(description)}
              >
              </Typography>
            </TableCell>
            <TableCell sx={{ maxWidth: 400 }}>
              <Typography
                variant='body1'
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',

                  '& p': {
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap'
                  },
                  '& span': {
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    color: 'inherit !important',
                    backgroundColor: 'inherit !important',
                    width: 'auto'
                  },
                }}
                dangerouslySetInnerHTML={createMarkup(information)}
              >
              </Typography>
            </TableCell>
            <TableCell align="right">
              <MoreMenu>
                <MoreMenuItemLink
                  title='Details'
                  to={`/admin/product-origins/details/${id}`}
                  iconName='eva:eye-outline'
                />
                <MoreMenuItemLink
                  title='Edit'
                  to={`/admin/product-origins/edit/${id}`}
                  iconName='eva:edit-outline'
                />
                <MoreMenuItem title="Delete" iconName="eva:trash-2-outline" id={id} handleClick={handleClickDelete}/>

              </ MoreMenu>
            </TableCell>
          </TableRow>
        );
      })}
    </DataTable>
  );
};

export default ProductOriginList;
