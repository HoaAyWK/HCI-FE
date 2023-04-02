import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  Link,
  Table,
  TableBody,
  TableContainer,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { LineItem } from './components';
import { Iconify } from '../../../components';
import Scrollbar from '../../../components/scrollbar';
import { AppTableHead, AppTableToolbar } from '../../../components/table';

const TABLE_HEAD = [
  { id: 'name', label: 'Product', alignRight: false },
  { id: 'price', label: 'Price', alignRight: true },
  { id: 'quantity', label: 'Quantity', alignRight: true },
  { id: 'total', label: 'Total', alignRight: true },
  { id: 'action', label: '', alignRight: false },
];

const lineItems = [
  {
    id: 1,
    name: 'Arizona Soft Footbed Sandal',
    price: 29.99,
    quantity: 1,
    image: 'assets/images/laptop_1.jpg'
  },
  {
    id: 3,
    name: 'Bitis Hunter',
    price: 35.99,
    quantity: 1,
    image: 'assets/images/laptop_2.jpg'
  },
  {
    id: 2,
    name: 'Zoom Freak 2',
    price: 12.99,
    quantity: 1,
    image: 'assets/images/laptop_3.jpg'
  },
];

const Cart = ({ step }) => {
  const [selected, setSelected] = useState([]);

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const newSelecteds = lineItems.map((item) => item.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (e, name) => {
    const selectedIndex = selected.indexOf(name);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  return (
    <Box sx={{ display: step === 0 ? 'block' : 'none' }}>
      <Card>
        <AppTableToolbar numSelected={selected.length} />
        <Scrollbar>
          <TableContainer sx={{ minWidth: 500 }}>
            <Table>
              <AppTableHead
                headLabels={TABLE_HEAD}
                rowCount={lineItems.length}
                numSelected={selected.length}
                onSelectAllClick={handleSelectAllClick}
              />
              <TableBody>
                {lineItems.map((item) => (
                  <LineItem item={item} selected={selected} handleClick={handleClick} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
      </Card>
      <Box sx={{ mt: 4 }}>
        <Link component={RouterLink} to='/' underline='none' color='inherit'>
          <Button color='inherit'>
            <Iconify icon='material-symbols:arrow-back-ios-new' width={16} height={16} />
            &nbsp;
            Continue shopping
          </Button>
        </Link>
      </Box>
    </Box>
  );
};

export default Cart;
