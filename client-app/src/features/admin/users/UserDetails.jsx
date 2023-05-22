import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Avatar, Box, Card, CardContent, Divider, Grid, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { Label, Loading } from '../../../components';
import { getUsers, selectUserById } from './userSlice';
import { fDate, fDateTime } from '../../../utils/formatTime';
import { FetchDataErrorMessage } from '../components';
import { selectOrdersByUserId, getOrders } from '../order/orderSlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import emptyBag from '../../../assets/images/empty_bag.png';
import { fCurrency } from '../../../utils/formatNumber';

const UserDetails = ({ id }) => {
  const user = useSelector((state) => selectUserById(state, id));
  const { getUsersStatus } = useSelector((state) => state.adminUsers);
  const { getOrdersStatus } = useSelector((state) => state.adminOrders);
  const orders = useSelector((state) => selectOrdersByUserId(state, id));
  const dispatch = useDispatch();

  useEffect(() => {
    if (getUsersStatus === ACTION_STATUS.IDLE) {
      dispatch(getUsers());
    }

    if (getOrdersStatus === ACTION_STATUS.IDLE) {
      dispatch(getOrders());
    }
  }, []);

  if (getOrdersStatus === ACTION_STATUS.IDLE ||
      getOrdersStatus === ACTION_STATUS.LOADING ||
      getUsersStatus === ACTION_STATUS.IDLE ||
      getUsersStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getOrdersStatus === ACTION_STATUS.FAILED ||
      getUsersStatus === ACTION_STATUS.FAILED) {
    return <FetchDataErrorMessage />;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Card sx={{ borderRadius: 1 }}>
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Avatar sx={{ width: 144, height: 144 }} src={user?.avatar} />
            </Box>
            <Stack spacing={0.25} sx={{ mt: 1 }} justifyContent='center' alignItems='center'>
              <Typography variant='subtitle1' component='span' color='text.primary'>
                {user?.firstName + " " + user?.lastName}
              </Typography>
              <Label color={user?.role === 'admin' ? 'primary' : 'warning' }>
                {user?.role === 'admin' ? 'Admin' : 'User'}
              </Label>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ borderRadius: 1, mt: 2 }}>
          <CardContent>
            <Stack spacing={2}>
              <Stack spacing={1}>
                <Typography variant='body1' color='text.secondary'>
                  Email
                </Typography>
                <Typography variant='body1' color='text.primary'>
                  {user?.email}
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant='body1' color='text.secondary'>
                  Phone
                </Typography>
                <Typography variant='body1' color='text.primary'>
                  {user?.phone}
                </Typography>
              </Stack>
              <Grid container spacing={0}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography variant='body1' color='text.secondary'>
                      Date of birth
                    </Typography>
                    <Typography variant='body1' color='text.primary'>
                      {fDate(user?.birthDate)}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                <Stack spacing={1}>
                    <Typography variant='body1' color='text.secondary'>
                      Gender
                    </Typography>
                    <Typography variant='body1' color='text.primary'>
                      {user?.gender}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Stack spacing={1}>
                <Typography variant='body1' color='text.secondary'>
                  Address
                </Typography>
                <Typography variant='body1' color='text.primary'>
                  {user?.address}
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant='h6' color='text.secondary'>
          ORDERS
        </Typography>
        <Divider sx={{ mt: 1, mb: 1 }} />
        {orders?.length === 0 ? (
          <Stack spacing={2}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Box
                sx={{

                  width: 200,
                  height: 200,
                  objectFit: 'cover'
                }}
                component='img'
                src={emptyBag}
              />
            </Box>
            <Typography variant='h6' component='p' textAlign='center' color='text.secondary'>
              This user does not have any orders.
            </Typography>
          </Stack>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Typography variant='body1'>
                        {fDateTime(order.orderDate)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant='body1'>
                        {fCurrency(order.price)}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <Link component={RouterLink} to={`/admin/orders/details/${order.id}`} underline='none'>
                        <Typography variant='body1'>
                          Details
                        </Typography>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Grid>
  );
};

export default UserDetails;
