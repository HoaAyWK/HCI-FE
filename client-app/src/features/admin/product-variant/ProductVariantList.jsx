import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getComparator, applySortFilter } from '../../../utils/tableUtil';
import { DataTable, FetchDataErrorMessage, Loading } from '../components';

import { selectAllProductVariants, getProductVariants } from './productVariantSlice';
import ACTION_STATUS from '../../../constants/actionStatus';
import ProductVariantLine from './ProductVariantLine';

const TABLE_HEAD = [
  { id: 'name', label: 'Product Origin', alignRight: false },
  { id: 'specification', label: 'Specification', alignRight: false },
  { id: 'color', label: 'Color', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'price', label: 'Price', alignRight: true },
  { id: '', label: '', alignRight: false },
];

const ProductList = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const dispatch = useDispatch();
  const { getProductVariantsStatus } = useSelector((state) => state.adminProductVariants);
  const productVariants = useSelector(selectAllProductVariants);

  useEffect(() => {
    if (getProductVariantsStatus === ACTION_STATUS.IDLE) {
      dispatch(getProductVariants());
    }
  }, []);

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



  const filteredProducts = applySortFilter(productVariants, getComparator(order, orderBy), filterName);

  if (getProductVariantsStatus === ACTION_STATUS.IDLE ||
      getProductVariantsStatus === ACTION_STATUS.LOADING) {
    return <Loading />;
  }

  if (getProductVariantsStatus === ACTION_STATUS.FAILED) {
    return <FetchDataErrorMessage />;
  }

  return (
    <DataTable
      order={order}
      orderBy={orderBy}
      filterName={filterName}
      filteredData={filteredProducts}
      tableHead={TABLE_HEAD}
      title='product variants'
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowPerPage={handleChangeRowPerPage}
      handleFilterByName={handleFilterByName}
      handleRequestSort={handleRequestSort}
    >
      {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
        <ProductVariantLine variant={row} key={row.id} />
      ))}
    </DataTable>
  );
};

export default ProductList;
