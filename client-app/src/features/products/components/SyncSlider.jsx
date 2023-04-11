import React, { useState } from 'react';
import { Box } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import MainSlide from './MainSlide';
import SubSlide from './SubSlide';

const SyncSlider = ({ images }) => {
  const [mainNav, setMainNav] = useState(null);
  const [subNav, setSubNav] = useState(null);

  const mainNavSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: subNav,
    arrows: false
  };

  const subNavSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    asNavFor: mainNav,
    arrows: false,
  };

  return (
    <div>
      <Box sx={{
        borderRadius: 2,
        mb: 3,
        position: 'relative',
      }}>
        <Slider {...mainNavSettings} ref={slider => setMainNav(slider)}>
            {images && images.map(image => (
              <MainSlide key={image.id} image={image.url} />
            ))}
        </Slider>
      </Box>
      <Box
        sx={{
          margin: '0 auto',
          '& .slick-slide': {
            opacity: 0.48,
          },
          '& .slick-current': {
            opacity: 1
          },

        }}
      >
        <Slider {...subNavSettings} ref={slider => setSubNav(slider)}>
          {images && images.map((image, index) => (
            <SubSlide key={image.id} image={image.url} />
          ))}
        </Slider>
      </Box>
    </div>
  );
};

export default SyncSlider;
