import React, { useState } from 'react';
import { TableRow, TableCell, Typography } from '@mui/material';

import { getComparator, applySortFilter } from '../../../utils/tableUtil';
import { DataTable } from '../components';
import { MoreMenuItemLink, MoreMenu, MoreMenuItem } from '../../../components/table';
import { Label } from '../../../components';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'numberOfProducts', label: 'Number of products', alignRight: true },
  { id: '', label: '', alignRight: false },
];

const categories = [
  { name: 'Laptop', status: 'Available', numberOfProducts: 212 },
  { name: 'Smartphone', status: 'Available', numberOfProducts: 495 },
  { name: 'components', status: 'Unavailable', numberOfProducts: 87 },
];

const CategroyList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
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

  const filterdCategories = applySortFilter(categories, getComparator(order, orderBy), filterName);

  return (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filterdCategories}
      tableHead={TABLE_HEAD}
      title='categories'
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filterdCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        const { name, status, numberOfProducts } = row;

        return (
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
                <MoreMenuItemLink title='Edit' to='/admin/products/edit' iconName='eva:edit-outline' />
                <MoreMenuItem title="Delete" iconName="eva:trash-2-outline"/>
              </ MoreMenu>
            </TableCell>
          </TableRow>
        );
      })}
    </DataTable>
  );
};

export default CategroyList;
