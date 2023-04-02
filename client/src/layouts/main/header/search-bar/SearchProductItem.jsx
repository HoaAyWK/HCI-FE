import React from 'react';
import { Box } from '@mui/material';

const SearchedProductItem = (props) => {
  const { item, components, navigate } = props;

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/products/thinkpad');
  };

  return (
    <a href='/products/thinkpad' onClick={handleClick} className='aa-ItemLink'>
      <Box className='aa-ItemConent' sx={{ display: 'flex' }}>
        <div className='aa-ItemIcon aa-ItemIcon--picture aa-ItemIcon--alignTop'>
          <img src={item.image} alt={item.name} width="40" height="40" />
          </div>
          <Box className='aa-ItemContentBody' sx={{ p: 1 }}>
            <div className='aa-ItemContentTitle'>
              <components.Snippet hit={item} attribute='name' />
            </div>
            <div className='aa-ItemContentDescription'>
              <strong>${item.price}</strong>
            </div>
          </Box>
      </Box>
    </a>
  );
};

export default SearchedProductItem;
