import React, { useState } from 'react';
import { useRefinementList } from 'react-instantsearch-hooks-web';
import {
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';

import { SearchBox } from './components';

const SearchRefinementList = (props) => {
  const { searchable, label } = props;
  const [filter, setFilter] = useState('');

  const { items, refine, canToggleShowMore, toggleShowMore, searchForItems } = useRefinementList(props);


  const handleToggle = (value) => () => {
    refine(value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
    searchForItems(e.target.value);
  };

  return (
    <Stack spacing={0.5}>
      <Typography variant='subtitle2' color='text.secondary' textTransform='uppercase'>
        {label}
      </Typography>
      <Stack spacing={1}>
        {searchable && <SearchBox title='categories' filter={filter} onFilter={handleFilter} />}
        <List>
          {items.map((item) => (
            <ListItem key={item.value} disablePadding disableGutters>
              <ListItemButton role={undefined} onClick={handleToggle(item.value)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge='end'
                    checked={item.isRefined}
                    tabIndex={-1}
                    inputProps={{ 'aria-label': item.label }}
                  />
                </ListItemIcon>
                <ListItemText id={item.label} primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
          <Button
            onClick={toggleShowMore}
            fullWidth
          >
            {canToggleShowMore ? 'Show less' : 'Show more'}
          </Button>
        </List>
      </Stack>
    </Stack>
  );
};

export default SearchRefinementList;
