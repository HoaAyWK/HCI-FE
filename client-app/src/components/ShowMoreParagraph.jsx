import React, { useState } from 'react';
import { alpha } from '@mui/material/styles';
import { Box, Button, Typography } from '@mui/material';

const ShowMoreParagraph = ({ height, children }) => {
  const [showMore, setShowMore] = useState(false);

  const handleToggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Box
        sx={{
          height: showMore ? 'auto' : height,
          width: '100%',
          mb: 1,
        }}
      >
        <Typography variant='body1'>
          {children}
        </Typography>
      </Box>
      {!showMore && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            py: 2,
            top: '100%',
            left: 0,
            right: 0,
            backgroundImage: (theme) => `linear-gradient(to bottom, ${alpha(theme.palette.background.paper, 0.7)}, ${theme.palette.background.paper} 90%, ${alpha(theme.palette.background.paper, 0)})`
          }}
        >
          <Box
          >
            <Button variant='outlined' size='small' onClick={handleToggleShowMore}>
              Show more
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ShowMoreParagraph;
