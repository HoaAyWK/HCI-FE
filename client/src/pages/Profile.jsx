import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { MyProfile } from '../features/profile';

const Profile = () => {
  return (
    <Box sx={{ marginBlockStart: 8 }}>
      <MyProfile />
      <Outlet />
    </Box>
  );
};

export default Profile;
