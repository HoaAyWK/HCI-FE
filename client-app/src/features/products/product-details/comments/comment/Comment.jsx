import React from 'react';
import { Avatar, Box, Button, Grid, Stack, Typography } from '@mui/material';

import { Iconify } from '../../../../../components';

const Comment = ({ comment }) => {
  return (
    <Grid container spacing={2} sx={{ my: 1 }}>
      <Grid item xs={2}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alginItems: 'center',
          }}
        >
          <Avatar src={comment.user.avatar} sx={{ width: 48, height: 48 }} />
        </Box>
      </Grid>
      <Grid item xs={10}>
        <Stack spacing={1} sx={{ mt: 1 }}>
          <Stack spacing={0.2} direction='row'>
            <Typography variant='body1' color='text.primary'>
              {comment.user.firstName + " " + comment.user.lastName}
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {fToNow(review.createdAt)}
            </Typography>
          </Stack>
          <Typography
            variant='body2'
            color='text.secondary'
            dangerouslySetInnerHTML={createMarkup(review.content)}
          />
          <Stack direction='row' spacing={2}>
            <Button>
              <Iconify icon='mdi:like' width={20} height={20} />
              &nbsp;
              Like
            </Button>
            <Button>
              <Iconify icon='material-symbols:reply' width={20} height={20} />
              &nbsp;
              Reply
            </Button>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Comment;
