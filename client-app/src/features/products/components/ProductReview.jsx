import React from 'react';
import { Button, Grid, Box, Typography, Stack, Rating } from '@mui/material';

import { StyledAvatar } from './styles';
import { Iconify } from '../../../components';

const ProductReview = () => {
  return (
    <Grid container spacing={2} sx={{ my: 1 }}>
      <Grid item xs={3} lg={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alginItems: 'center',
          }}
        >
          <div>
            <StyledAvatar />
            <Stack spacing={0.2} justifyContent='center' alignItems='center'>
              <Typography variant='body1' color='text.primary'>
                Sioay Here
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                2 hours ago
              </Typography>
            </Stack>
          </div>
        </Box>
      </Grid>
      <Grid item xs={9} lg={10}>
        <Stack spacing={1}>
          <Rating value={4} readOnly />
          <Typography variant='body2' color='text.secondary'>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </Typography>
          <Stack direction='row' spacing={2}>
            <Button>
              <Iconify icon='mdi:like' width={20} height={20} />
              &nbsp;
              Like
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default ProductReview;
