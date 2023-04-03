import React from 'react';
import { Stack, Typography } from '@mui/material';

import { Iconify } from '../../components';

const ProfileOverview = ({ phone, dateOfBith, address}) => {
  return (
    <Stack spacing={2}>
      <Stack spacing={1} direction='row'>
        <Iconify icon='material-symbols:phone-enabled' width={24} height={24} />
        <Typography variant='body1'>
          {phone}
        </Typography>
      </Stack>
      <Stack spacing={1} direction='row'>
        <Iconify icon='ic:baseline-calendar-month' width={24} height={24} />
        <Typography variant='body1'>
          {dateOfBith}
        </Typography>
      </Stack>
      <Stack spacing={1} direction='row'>
        <Iconify icon='material-symbols:location-on' width={24} height={24} />
        <Typography variant='body1'>
          {address}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ProfileOverview;
