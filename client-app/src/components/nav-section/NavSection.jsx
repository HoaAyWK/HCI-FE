import React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { NavLink as RouterLink } from 'react-router-dom';
import { Box, List, ListItemText, Typography } from '@mui/material';

import { StyledNavItem, StyledNavItemIcon } from './styles';

const NavItem = ({ item, miniDrawer }) => {
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
          mb: 1
        },
      }}
    >
      {miniDrawer ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <StyledNavItemIcon>{icon && icon }</StyledNavItemIcon>
          <Typography variant='iconLabel'>{title}</Typography>
        </Box>
      ) : (
        <>
          <StyledNavItemIcon>{icon && icon }</StyledNavItemIcon>
          <ListItemText primary={title} />
        </>
      )}
      {info && info}
    </StyledNavItem>
  );
};

const NavSection = ({ data = [], miniDrawer, ...other }) => {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => <NavItem key={item.title} item={item} miniDrawer={miniDrawer} />)}
      </List>
    </Box>
  )
};

export default NavSection;
