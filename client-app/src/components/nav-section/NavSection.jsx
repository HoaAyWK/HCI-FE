import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText } from '@mui/material';

import { StyledNavItem, StyledNavItemIcon } from './styles';

const NavItem = ({ item }) => {
  const theme = useTheme();

  const { path, title, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: theme.palette.primary.main,
          backgroundColor: `${alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)}`,
          fontWeight: 'fontWeightBold',
        },

      }}
    >
      <StyledNavItemIcon>{icon && icon }</StyledNavItemIcon>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </StyledNavItem>
  );
};

const NavSection = ({ data = [], ...other }) => {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => <NavItem key={item.title} item={item} />)}
      </List>
    </Box>
  )
};

export default NavSection;
