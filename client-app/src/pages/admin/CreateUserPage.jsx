import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Breadcrumbs, Container, Link, Stack, Typography } from '@mui/material';

import { Page, Iconify } from '../../components';
import { UserForm } from '../../features/admin/users';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'User', path: '/admin/users' },
  { label: 'Create new user' },
];

const CreateUserPage = () => {
  const [enabled, setEnabled] = useState(true);

  return (
    <Page title='Create User'>
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
          </Box>
          <UserForm isEdit={false} enabled={enabled} />
        </Box>
      </Container>
    </Page>
  );
};

export default CreateUserPage;
