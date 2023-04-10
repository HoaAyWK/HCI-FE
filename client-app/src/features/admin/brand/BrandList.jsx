import React, { useState } from 'react';
import { TableRow, TableCell, Typography } from '@mui/material';

import { DataTable } from '../components';
import { getComparator, applySortFilter } from '../../../utils/tableUtil';
import { MoreMenuItemLink, MoreMenu, MoreMenuItem } from '../../../components/table';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: '', label: '', alignRight: false },
];

const brands = [
  { name: 'Samsung' },
  { name: 'Apple' },
  { name: 'Oppo' },
];

const BrandList = () => {
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

  const filteredBrands = applySortFilter(brands, getComparator(order, orderBy), filterName);

  return (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filteredBrands}
      tableHead={TABLE_HEAD}
      title='brands'
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filteredBrands.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        const { name } = row;

        return (
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

export default BrandList;
