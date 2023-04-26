import React, { useMemo } from 'react';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import { Box, Button, Grid, IconButton, Link, Rating, Stack, Typography  } from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';

import { Cover, Iconify, Label } from '../../../components'
import { fCurrency } from '../../../utils/formatNumber';
import { addToCart } from '../cartSlice';

const ProductCard = ({ product }) => {
  const { id, name, media, price, discount } = product;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const priceReal = useMemo(() => {
    if (discount > 0) {
      return price - (price * (discount / 100));
    }

    return price;
  }, [price, discount]);

  const handleClickAddToCart = async () => {
    try {
      const actionResult = await dispatch(addToCart({ productId: id, quantity: 1 }));
      const result = unwrapResult(actionResult);

      if (result) {
        enqueueSnackbar('Added 1 item to your cart', { variant: 'success' });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleClickBuyNow = async () => {
    try {
      const actionResult = await dispatch(addToCart({ productId: id, quantity: 1 }));
      const result = unwrapResult(actionResult);

      if (result) {
        navigate('/checkout');
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

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
        },
        transition: 'all 0.3s ease-in-out 0s'
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
        <Link component={RouterLink} to={`/products/${id}`}>
          <Cover
            src={media[0]}
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
        <Link color="inherit" underline="hover" component={RouterLink} to={`/products/${id}`}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>
        <Rating readOnly value={4} size='small' precision={0.5} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6" component='p' color='error'>
              {fCurrency(priceReal)}
              &nbsp;
              {discount > 0 && (
                <Typography
                  component="span"
                  variant="body1"
                  sx={{
                    color: 'text.disabled',
                    textDecoration: 'line-through',
                  }}
                >
                  {discount && fCurrency(price)}
                </Typography>
              )}
            </Typography>
          </Stack>
          {discount > 0 && (
            <Label variant='outlined' color='error'>-{discount}%</Label>
          )}
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
            <Button
              variant='contained'
              color='primary'
              fullWidth
              onClick={handleClickAddToCart}
            >
              {/* <Iconify icon='mdi:add-shopping-cart' width={24} height={24} />
              &nbsp; */}
              Add To Cart
            </Button>
          </Grid>
          <Grid item xs={5}>
            <Button
              variant='contained'
              color='warning'
              fullWidth
              onClick={handleClickBuyNow}
            >
              Buy Now
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductCard;
