import React, { useState } from 'react';
import { Table, TableContainer, Card, TableBody, TableRow, TableCell, TablePagination } from '@mui/material';

import { AppTableHead, AppTableToolbar } from '../../../components/table';
import { FilterOnTableNotFound } from '../../../components';

const UserList = ({
  filteredData = [],
  tableHead,
  title,
  order,
  orderBy,
  page,
  rowsPerPage,
  filterName,
  handleRequestSort,
  handleFilterByName,
  handleChangePage,
  handleChangeRowPerPage,
  children }) => {

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
  const isRecordNotFound = filteredData.length === 0;


  return (
    <Card>
      <AppTableToolbar filterName={filterName} onFilterName={handleFilterByName} title={title} />
      <TableContainer sx={{ minWidth: 800 }}>
        <Table>
          <AppTableHead
            order={order}
            orderBy={orderBy}
            headLabel={tableHead}
            rowCount={filterName.length}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {children}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>

          {isRecordNotFound && (
            <TableBody>
              <TableRow>
                <TableCell align='center' colSpan={6} sx={{ py: 3 }}>
                  <FilterOnTableNotFound searchQuery={filterName} />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowPerPage}
      />
    </Card>
  );
};

export default UserList;
