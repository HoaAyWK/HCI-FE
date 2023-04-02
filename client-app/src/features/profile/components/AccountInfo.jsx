import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography, Paper, Avatar, Divider, Stack } from '@mui/material';


const PaperStyle = styled(Paper)(({ theme }) => ({
  color: theme.palette.main,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  zIndex: 0,
  boxShadow: theme.shadows[2],
  padding: theme.spacing(2),
  marginBottom: 15
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    width: '100px',
    height: '100px',
    fontSize: '2.5rem'
  },

  [theme.breakpoints.up('md')]: {
    width: '120px',
    height: '120px',
    fontSize: '3rem',
  }
}));

const DetailInline = (props) => {
  const { label, children } = props;

  return (
    <Box sx={{ display: 'flex' }}>
      <Typography
        sx={{
          minWidth: '100px'
        }}
        variant='body-1'
        color='text.secondary'
      >
        { label }
      </Typography>
      <Typography variant='body-1' color='text.primary'>
        { children }
      </Typography>
    </Box>
  );
};

const AccountInfo = () => {
  return (
    <PaperStyle>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2
        }}
      >
        <AvatarStyle />
        <Typography
          variant='h6'
          component='span'
          sx={{
            fontSize: '1.5rem',
            marginBlockStart: 1
          }}
        >
          Sioay Here
        </Typography>
        <Typography variant='body-2' color='text.secondary'>Default</Typography>
      </Box>
      <Box sx={{ marginInline: 2 }}>
        <Divider />
      </Box>
      <Box sx={{ paddingInline: 2 }}>
        <Typography variant='h6' component='div' sx={{ my: 2 }}>
          Details
        </Typography>
        <Stack spacing={2}>
          <DetailInline label='Email'>
            sioay@gmail.com
          </DetailInline>
          <DetailInline label='Phone'>
            08129313089321
          </DetailInline>
          <DetailInline label='Address'>
            TD, Ho Chi Minh City
          </DetailInline>
        </Stack>
      </Box>
    </PaperStyle>
  );
};

export default AccountInfo;
