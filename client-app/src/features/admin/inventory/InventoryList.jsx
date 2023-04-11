import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getComparator, applySortFilter } from '../../../utils/tableUtil';
import { DataTable } from '../components';
import InventoryLine from './InventoryLine';
import { selectAllInventories, getInventories } from './inventorySlice';

const TABLE_HEAD = [
  { id: 'productId', label: 'Product ID', alignRight: false },
  { id: 'productName', label: 'Product Name', alignRight: false },
  { id: 'quanitty', label: 'Quantity', alignRight: true },
  { id: '', label: '', alignRight: false },
];

const INVENTORIES = [
  { productId: 120391, productName: 'ThinkPad X1 Carbon', quantity: 312 },
  { productId: 120392, productName: 'MacBook Air M1 2020', quantity: 935 },
  { productId: 120393, productName: 'MacBook Pro M1 2020', quantity: 290 },
  { productId: 120394, productName: 'ThinkPad E490', quantity: 183 },
  { productId: 120395, productName: 'ThinkPad T14', quantity: 71 },
];

const InventoryList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const inventories = useSelector(selectAllInventories);
  const { getInventoriesStatus } = useDispatch((state) => state.adminInventories);

  useEffect(() => {
    if (getInventoriesStatus) {
      dispatch(getInventories());
    }
  }, [getInventoriesStatus]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredInventories = applySortFilter(INVENTORIES, getComparator(order, orderBy), filterName);


  return (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filteredInventories}
      tableHead={TABLE_HEAD}
      title='inventory'
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filteredInventories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
        <InventoryLine key={row.productId} inventory={row} />
      ))}
    </DataTable>
  );
};

export default InventoryList;
