import React, { useState } from 'react';
import { Box, Button, Divider, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { ORDER_STATUS, STATUS } from '../../../constants/orderStatus';
import { Order } from './components';
import { Page } from '../../../components';

const StyledBox = styled(Box)(({ theme }) => ({
  '& .slick-slide': {
    width: 'auto !important'
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  boxShadow: 'none'
}));

const orders = [
  {
    id: 12984,
    createdDate: '02/04/2023 09:12 AM',
    status: STATUS.PAID,
    items: [
      {
        id: 'product1',
        name: 'MacBook Air M1 2020',
        quantity: 2,
        price: 1699,
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
      },
      {
        id: 'product2',
        name: 'ThinkPad X1 Carbon',
        quantity: 1,
        price: 1499,
        image: 'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      }
    ]
  },
  {
    id: 230912,
    createdDate: '01/04/2023 07:38 AM',
    status: STATUS.PAID,
    items: [
      {
        id: 'product1',
        name: 'MacBook Air M1 2020',
        quantity: 1,
        price: 1699,
        image: 'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80',
      },
      {
        id: 'product3',
        name: 'ThinkPad T14',
        quantity: 1,
        price: 1299,
        image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      }
    ]
  }
];

const ProfileOrders = () => {
  const [currentStatus, setCurrentStatus] = useState('All');
  const [nav, setNav] = useState(null);

  const navSettings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    swipeToSlide: true,
    arrows: false,
    centerPadding: '20px',
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3
        }
      },
    ]
  };

  const handleClick = (value) => () => {
    setCurrentStatus(value);
  };

  return (
    <Page title='My Orders'>
      <StyledBox>
        <Slider {...navSettings} ref={slider => setNav(slider)}>
          <Box sx={{ mr: 2 }}>
            <StyledButton
              size='small'
              variant={currentStatus === 'All' ? 'contained' : 'text'}
              color={currentStatus === 'All' ? 'primary' : 'inherit' }
              disableElevation
              onClick={handleClick('All')}
            >
              All
            </StyledButton>
          </Box>
          {ORDER_STATUS.map((status) => (
            <Box sx={{ mr: 2 }} key={status}>
              <StyledButton
                size='small'
                disableElevation
                variant={currentStatus === status ? 'contained' : 'text'}
                color={currentStatus === status ? 'primary' : 'inherit' }
                onClick={handleClick(status)}
              >
                {status}
              </StyledButton>
            </Box>
          ))}
        </Slider>
      </StyledBox>
      <Stack spacing={3} sx={{ mt: 6 }}>
        {orders.map((order, index) => (
          <Box key={order.id} sx={{ width: '100%' }}>
            <Order key={order.id} order={order} />
            {index < orders.length - 1 && (
              <Divider sx={{ mt: 4, mb: 2 }} />
            )}
          </Box>
        ))}
      </Stack>
    </Page>
  );
};

export default ProfileOrders;
