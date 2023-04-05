import React, { useState } from 'react';
import { TableRow, TableCell, Stack, Typography } from '@mui/material';

import { applySortFilter, getComparator } from '../../../utils/tableUtil';
import { DataTable } from '../components';
import { Label, LetterAvatar } from '../../../components';
import { MoreMenu, MoreMenuItem, MoreMenuItemLink } from '../../../components/table';

const TABLE_HEAD = [
  { id: 'firstName', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '', label: '', alignRight: false }
];

const users = [
  { id: 1, firstName: 'Lucas', lastName: 'Steve', email: 'ls@gmail.com', role: 'user', status: 'Active' },
  { id: 2, firstName: 'Sam', lastName: 'Feldt', email: 'sf@gmail.com', role: 'user', status: 'Banned' },
  { id: 3, firstName: 'Justin', lastName: 'Mylo', email: 'jm@gmail.com', role: 'user', status: 'Banned' },
  { id: 4, firstName: 'Mike', lastName: 'Williams', email: 'mw@gmail.com', role: 'user', status: 'Active' },
  { id: 5, firstName: 'David', lastName: 'Brooks', email: 'db@gmail.com', role: 'user', status: 'Active' },
];

const UserList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');
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

  const filteredUsers = applySortFilter(users, getComparator(order, orderBy), filterName);

  return (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filteredUsers}
      tableHead={TABLE_HEAD}
      title='users'
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
        const { id, firstName, lastName, email, role, status } = row;

        return (
          <TableRow
            key={id}
            hover
            tabIndex={-1}
          >
            <TableCell component='th' scope='row'>
              <Stack spacing={1} direction='row' alignItems='center'>
                <LetterAvatar name={firstName + ' ' + lastName} />
                <Typography variant='body1'>{firstName + ' ' + lastName}</Typography>
              </Stack>
            </TableCell>
            <TableCell>
              {email}
            </TableCell>
            <TableCell>
              <Label color={role === 'user' ? 'warning' : 'primary'}>{role}</Label>
            </TableCell>
            <TableCell>
              <Label color={status === 'Active' ? 'success' : 'error'}>{status}</Label>
            </TableCell>
            <TableCell align="right">
              <MoreMenu>
                <MoreMenuItemLink title='Details' to='/admin/users/details' iconName='eva:eye-outline' />
                <MoreMenuItemLink title='Edit' to='/admin/users/edit' iconName='eva:edit-outline' />
                <MoreMenuItem title="Ban" iconName="mdi:ban" id={id}/>
                <MoreMenuItem title="Delete" iconName="eva:trash-2-outline" id={id}/>

              </ MoreMenu>
            </TableCell>
          </TableRow>
        );
      })}
    </DataTable>
  );
};

export default UserList;
