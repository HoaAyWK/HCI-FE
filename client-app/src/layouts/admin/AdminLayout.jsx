import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
//
import AdminHeader from './header';
import AdminNavbar from './navbar';
import { useResponsive } from '../../hooks';

// ----------------------------------------------------------------------
const NAV_WIDTH = 280;
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 92;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  position: 'relative'
});

const Main = styled('div', { shouldForwardProp: prop => prop !== 'miniDrawer' })(({ theme, miniDrawer }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  position: 'absolute',
  right: 0,
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: `calc(100% - (${NAV_WIDTH}px + 1px))`,
    ...(miniDrawer && {
      width: `calc(100% - (${theme.spacing(10)} + 1px))`,
    })
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const isDesktop = useResponsive('up', 'lg');
  const [openDesktopNav, setOpenDesktopNav] = useState(true);
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const handleToggleDesktopNav = () => {
    setOpenDesktopNav(prev => !prev);
  };

  const handleOpenMoblileNav = () => {
    setOpenMobileNav(true);
  };

  const handleCloseMobileNav = () => {
    setOpenMobileNav(false);
  };

  const handleToggleMobileNav = () => {
    setOpenMobileNav(prev => !prev);
  };

  return (
    <StyledRoot>
      <AdminHeader
        openDesktopNav={openDesktopNav}
        onOpenMobileNav={handleOpenMoblileNav}
      />

      <AdminNavbar
        isDesktop={isDesktop}
        openDesktopNav={openDesktopNav}
        openMobileNav={openMobileNav}
        onCloseMobileNav={handleCloseMobileNav}
        onToggleDesktopNav={handleToggleDesktopNav}
        onToggleMobileNav={handleToggleMobileNav}
      />

      <Main miniDrawer={isDesktop && !openDesktopNav}>
        <Outlet />
      </Main>

    </StyledRoot>
  );
}
