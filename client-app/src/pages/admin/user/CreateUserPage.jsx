import React from 'react';

import { AdminPageLayout } from '../common';
import { UserForm } from '../../../features/admin/users';

const breadcrumbs = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'User', path: '/admin/users' },
  { label: 'Create new user' },
];

const CreateUserPage = () => {

  return (
    <AdminPageLayout
      pageTitle='Create a new user'
      pageHeaderName='Create user'
      showCreateButton={false}
      breadcrumbs={breadcrumbs}
    >
      <UserForm isEdit={false} />
    </AdminPageLayout>
  );
};

export default CreateUserPage;
