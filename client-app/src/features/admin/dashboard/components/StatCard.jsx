import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

import { Iconify } from '../../../../components';

const StyledIconBox = styled(Box)(({ theme }) => ({
  width: 36,
  height: 36,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
}));

const StatCard = ({ stat }) => {
  const { label, total, icon, isIncrease, value } = stat;

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Stack spacing={1}>
            <Typography variant='h6' component='span' color='text.secondary'>
              {label}
            </Typography>
            {isIncrease ? (
              <Stack spacing={1} direction='row' alignItems='center'>
                <StyledIconBox
                  sx={{
                    backgroundColor: (theme) => `${alpha(theme.palette.success.main, 0.16)}`,
                    color: (theme) => `${theme.palette.success.main}`,
                  }}
                >
                  <Iconify icon='material-symbols:trending-up-rounded' width={24} height={24} />
                </StyledIconBox>
                <Typography color='text.primary' variant='subtitle1'>+{value}%</Typography>
              </Stack>
            ) : (
              <Stack spacing={1} direction='row' alignItems='center'>
                <StyledIconBox
                  sx={{
                    backgroundColor: (theme) => `${alpha(theme.palette.error.main, 0.16)}`,
                    color: (theme) => `${theme.palette.error.main}`,
                  }}
                >
                  <Iconify icon='ic:round-trending-down' width={24} height={24} />
                </StyledIconBox>
                <Typography color='text.primary' variant='subtitle1'>-{value}%</Typography>
              </Stack>
            )}
            <Typography variant='h4' component='span'>{total}</Typography>
          </Stack>
          <StyledIconBox
            sx={{ width: 52, height: 52, backgroundColor: (theme) => theme.palette.background.neutral }}
          >
            <Iconify icon={icon} width={32} height={32} sx={{ color: 'text.secondary' }} />
          </StyledIconBox>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
