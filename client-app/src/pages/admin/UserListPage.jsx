import React from 'react';
import { Box, Container } from '@mui/material';

import { Page } from '../../components';
import { UserList } from '../../features/admin/users';

const UserListPage = () => {
  return (
    <Page title={pageTitle}>
      <Container maxWidth='xl'>
        <Box
          sx={{
            width: '100%',
            height
          }}
        >
          <UserList />
        </Box>
      </Container>
    </Page>
  );
};

export default UserListPage;
