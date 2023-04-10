import React, { useState } from 'react';
import { TableRow, TableCell, Typography } from '@mui/material';

import { getComparator, applySortFilter } from '../../../utils/tableUtil';
import { DataTable } from '../components';
import { MoreMenuItemLink, MoreMenu, MoreMenuItem } from '../../../components/table';
import { Label } from '../../../components';

const TABLE_HEAD = [
  { id: 'id', label: 'Order ID', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'total', label: 'Total', alignRight: true },
  { id: 'createdAt', label: 'Order Date', alignRight: false },
  { id: '', label: '', alignRight: false },
];

const orders = [
  { id: 12083, status: 'Paid', total: 1299, createdAt: '04/04/2023' },
  { id: 12084, status: 'Processing', total: 199, createdAt: '03/04/2023' },
  { id: 12085, status: 'Paid', total: 499, createdAt: '02/04/2023' },
  { id: 12086, status: 'Cancel', total: 1000, createdAt: '01/04/2023' },
  { id: 12087, status: 'Delivered', total: 999, createdAt: '31/03/2023' },
];

const OrderList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  const filterOrders = applySortFilter(orders, getComparator(order, orderBy), filterName);

  const statusColor = (status) => {
    if (status === 'Paid') {
      return 'primary';
    } else if (status === 'Processing') {
      return 'warning';
    } else if (status === 'Delivered') {
      return 'success';
    } else return 'error';
  }

  return (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filterOrders}
      tableHead={TABLE_HEAD}
      title='orders'
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filterOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        const { id, total, status, createdAt } = row;

        return (
          <TableRow
            key={id}
            hover
            tabIndex={-1}
          >
            <TableCell component='th' scope='row'>
              <Typography variant='body1'>#{id}</Typography>
            </TableCell>
            <TableCell>
              <Label color={statusColor(status)}>{status}</Label>
            </TableCell>
            <TableCell align='right'>
              ${total}
            </TableCell>
            <TableCell>
              {createdAt}
            </TableCell>
            <TableCell align="right">
              <MoreMenu>
                <MoreMenuItemLink title='Details' to='/admin/orders/details' iconName='eva:edit-outline' />
              </ MoreMenu>
            </TableCell>
          </TableRow>
        );
      })}
    </DataTable>
  );
};

export default OrderList;
