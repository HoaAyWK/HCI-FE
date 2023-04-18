import React from 'react';
import { Link as RouterLink} from 'react-router-dom';
import { Box, Button, Grid, IconButton, Link, Rating, Stack, Typography  } from '@mui/material';

import { Iconify, Label } from '../../../components'
import { fCurrency } from '../../../utils/formatNumber';

const ProductCard = ({ product }) => {
  const { name, image, price, discount, rating } = product;

  return (
    <Box
      sx={{
        borderRadius: 1,
        p: 0,
        position: 'relative',
        '&:hover .card-action': {
          opacity: 1,
          visibility: 'visible',
        },
        boxShadow: (theme) => theme.shadows[1],
        backgroundColor: (theme) => theme.palette.background.paper,
        '&:hover': {
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }
      }}
    >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        <IconButton
          aria-label='favorite'
          sx={{
            zIndex: 9,
            top: 8,
            right: 8,
            position: 'absolute',
            textTransform: 'uppercase',
          }}
        >
          <Iconify icon='mdi:cards-heart' width={24} height={24} />
        </IconButton>
        <Link component={RouterLink} to='/products/thinkpad'>
          <Box
            component='img'
            src={image}
            alt={name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              borderTopLeftRadius: (theme) => theme.shape.borderRadius,
              borderTopRightRadius: (theme) => theme.shape.borderRadius,
              top: 0
            }}
          />
        </Link>
      </Box>
      <Stack spacing={0.5} sx={{ px: 2, py: 2 }}>
        <Link color="inherit" underline="hover" component={RouterLink} to='/products/thinkpad'>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Rating readOnly value={rating} size='small' precision={0.5} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" component='p' color='error'>
              {fCurrency(price)}
              &nbsp;
              <Typography
                component="span"
                variant="body1"
                sx={{
                  color: 'text.disabled',
                  textDecoration: 'line-through',
                }}
              >
                {discount && fCurrency(discount)}
              </Typography>
            </Typography>
          </Stack>
          <Label variant='outlined' color='error'>-10%</Label>
        </Box>
      </Stack>
      <Box
        sx={{
          width: '100%',
          px: 2,
          pb: 2,
          position: 'absolute',
          top: '98%',
          left: 0,
          opacity: 0,
          visibility: 'hidden',
          zIndex: 10,
          backgroundColor: (theme) => theme.palette.background.paper,
          boxShadow: (theme) => theme.shadows[1],
          borderBottomLeftRadius: '8px',
          borderBottomRightRadius: '8px',
        }}
        className='card-action'
      >
        <Grid container spacing={1}>
          <Grid item xs={7}>
            <Button variant='contained' color='primary' fullWidth>
              {/* <Iconify icon='mdi:add-shopping-cart' width={24} height={24} />
              &nbsp; */}
              Add To Cart
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button variant='contained' color='warning' fullWidth>
              Buy Now
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductCard;
