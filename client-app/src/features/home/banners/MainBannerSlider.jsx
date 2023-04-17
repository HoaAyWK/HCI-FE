import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, List } from '@mui/material';

import { MainBannerSlide } from './components';

const IMAGES = [
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
  'https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  'https://images.unsplash.com/photo-1485988412941-77a35537dae4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1196&q=80',
]


const MainBannerSlider = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    lazyLoad: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    dotsClass: 'dots-none',
    appendDots: dots => (
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.background.default,
          padding: 1
        }}
      >
        <List
          sx={{
            display: 'flex',
            justifyContent: 'center',
            '& .slick-active div': {
              backgroundColor: (theme) => theme.palette.primary.dark
            },
            '& li': {

            }
          }}
        >
          {dots}
        </List>
      </Box>
    ),
    customPaging: index => (
      <Box
        sx={{
          width: 48,
          height: 5,
          backgroundColor: (theme) => theme.palette.divider,
          mx: 0.5
        }}
      />
    )
  };

  return (
    <Slider {...sliderSettings}>
      {IMAGES.map((image) => (
        <MainBannerSlide image={image} key={image} />
      ))}
    </Slider>
  );
};

export default MainBannerSlider;
