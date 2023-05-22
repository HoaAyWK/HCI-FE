import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, TableRow, TableCell, Stack, Typography } from '@mui/material';

import { applySortFilter, getComparator } from '../../../utils/tableUtil';
import { DataTable } from '../components';
import { Label, LetterAvatar } from '../../../components';
import { MoreMenu, MoreMenuItem, MoreMenuItemLink } from '../../../components/table';

import ACTION_STATUS from '../../../constants/actionStatus';
import { getUsers, selectAllUsers } from './userSlice';

const TABLE_HEAD = [
  { id: 'firstName', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '', label: '', alignRight: false }
];

const UserList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const { getUsersStatus } = useSelector((state) => state.adminUsers);

  useEffect(() => {
    if (getUsersStatus === ACTION_STATUS.IDLE) {
      dispatch(getUsers());
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
        const { id, firstName, lastName, email, role, status, avatar } = row;

        return (
          <TableRow
            key={id}
            hover
            tabIndex={-1}
          >
            <TableCell component='th' scope='row'>
              <Stack spacing={1} direction='row' alignItems='center'>
                {avatar ? (
                  <Avatar src={avatar} width={24} height={24} />
                ) : (
                  <LetterAvatar name={firstName + ' ' + lastName} />
                )}
                <Typography variant='body1'>{firstName + ' ' + lastName}</Typography>
              </Stack>
            </TableCell>
            <TableCell>
              {email}
            </TableCell>
            <TableCell>
              <Label color={role === 'admin' ? 'primary' : 'warning'}>{role === 'admin' ? 'Admin' : 'User'}</Label>
            </TableCell>
            <TableCell>
              <Label color={status === true ? 'success' : 'error'}>{status === true ? 'Active' : 'No active'}</Label>
            </TableCell>
            <TableCell align="right">
              <MoreMenu>
                <MoreMenuItemLink title='Details' to={`/admin/users/details/${id}`} iconName='eva:eye-outline' />
                <MoreMenuItemLink title='Edit' to={`/admin/users/edit/${id}`} iconName='eva:edit-outline' />
              </ MoreMenu>
            </TableCell>
          </TableRow>
        );
      })}
    </DataTable>
  );
};

export default UserList;
