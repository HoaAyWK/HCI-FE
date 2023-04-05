import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Breadcrumbs, Button, Container, Link, Stack, Typography } from '@mui/material';

import { Iconify, Page } from '../../components';
import { UserList } from '../../features/admin/users';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'User', path: '/admin/users' },
  { label: 'List' },
];

const UserListPage = () => {
  return (
    <Page title='Users'>
      <Container maxWidth='xl'>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 5
          }}
          >
            <Stack spacing={1}>
              <Typography variant='h4' component='h1'>
                User List
              </Typography>
              <Breadcrumbs
                separator={<Iconify icon='material-symbols:navigate-next' width={20} height={20} />}
                aria-label='breadcrumb'
              >
                {breadcrumbs.map((bc) => (
                  bc?.path ? (
                    <Link underline='hover' key={bc.label} color='inherit' component={RouterLink} to={bc.path}>
                      {bc.label}
                    </Link>
                  ) : (
                    <Typography variant='body1' color='text.primary' key={bc.label}>{bc.label}</Typography>
                  )
                ))}
              </Breadcrumbs>
            </Stack>
            <Button LinkComponent={RouterLink} to='/admin/users/create' color='primary' variant='contained'>
              <Stack spacing={1} direction='row'>
                <Iconify icon='eva:plus-fill' width={24} height={24} />
                <Typography variant='button'>
                  New User
                </Typography>
              </Stack>
            </Button>
          </Box>
          <UserList />
        </Box>
      </Container>
    </Page>
  );
};

export default UserListPage;
