import React from 'react';
import { Avatar, Box, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import { Label } from '../../../components';

const UserDetails = () => {
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
              <Avatar sx={{ width: 144, height: 144 }} />
            </Box>
            <Stack spacing={0.25} sx={{ mt: 1 }} justifyContent='center' alignItems='center'>
              <Typography variant='subtitle1' component='span' color='text.primary'>Sioay Here</Typography>
              <Label color='warning'>User</Label>
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
                  sioay@gmail.com
                </Typography>
              </Stack>
              <Stack spacing={1}>
                <Typography variant='body1' color='text.secondary'>
                  Phone
                </Typography>
                <Typography variant='body1' color='text.primary'>
                  091238991
                </Typography>
              </Stack>
              <Grid container spacing={0}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <Typography variant='body1' color='text.secondary'>
                      Date of birth
                    </Typography>
                    <Typography variant='body1' color='text.primary'>
                      02/05/2000
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                <Stack spacing={1}>
                    <Typography variant='body1' color='text.secondary'>
                      Gender
                    </Typography>
                    <Typography variant='body1' color='text.primary'>
                      Male
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
              <Stack spacing={1}>
                <Typography variant='body1' color='text.secondary'>
                  Address
                </Typography>
                <Typography variant='body1' color='text.primary'>
                  1 Vo Van Ngan, Thu Duc, Ho Chi Minh, Vietnam
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={8}>
        <Typography variant='h6' color='text.secondary'>
          INVOICE HISTORY
        </Typography>
        <Divider sx={{ mt: 1, mb: 3 }} />
        <Stack spacing={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant='body1'>
              03 April 2023
            </Typography>
            <Typography variant='body1'>
              $20
            </Typography>
            <Typography variant='body1' color='primary'>
              PDF
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant='body1'>
              03 April 2023
            </Typography>
            <Typography variant='body1'>
              $20
            </Typography>
            <Typography variant='body1' color='primary'>
              PDF
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant='body1'>
              03 April 2023
            </Typography>
            <Typography variant='body1'>
              $20
            </Typography>
            <Typography variant='body1' color='primary'>
              PDF
            </Typography>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default UserDetails;
