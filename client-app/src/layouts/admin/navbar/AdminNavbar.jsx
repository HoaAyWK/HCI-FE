import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack, IconButton } from '@mui/material';
// mock
// hooks
// components
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './NavConfig';
import { useResponsive } from '../../../hooks';
import { Iconify } from '../../../components';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const openedMixin = (theme) => ({
  width: NAV_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overFlowX: 'hidden'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  width: `calc(${theme.spacing(10)} + 1px)`,
});

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open'})(
  ({ theme, open }) => ({
    width: NAV_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme)
    }),
  })
);

const StyledIconButton = styled(IconButton, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    position: 'fixed',
    top: 22,
    left: open ? `calc(${NAV_WIDTH}px - 14px)` : `calc(${theme.spacing(10)} - 13px)`,
    zIndex: 1201,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `1px dashed ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
    '&:hover': {
      backgroundColor: theme.palette.background.neutral
    }
  })
);

// ----------------------------------------------------------------------

const DrawerContent = ({ isOpen, isMiniDrawer }) => {
  return (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        Logo
      </Box>

      <Box sx={{ mb: 5, mx: 2.5, display: isOpen ? 'block' : 'none' }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar  alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                Lucas Steve
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Admin
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>
      <NavSection data={navConfig} miniDrawer={isMiniDrawer} />

    </Scrollbar>
  );
}


export default function AdminNavbar({ openDesktopNav, openMobileNav, onCloseMobileNav, onToggleDesktopNav, isDesktop }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (openMobileNav) {
      onCloseMobileNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <>
          <StyledIconButton size='small' open={openDesktopNav}>
            <Iconify
              onClick={onToggleDesktopNav}
              icon={openDesktopNav ? 'material-symbols:arrow-back-ios-rounded' : 'material-symbols:arrow-forward-ios-rounded'}
              width={16}
              height={16}
            />
          </StyledIconButton>
          <StyledDrawer
            open={openDesktopNav}
            variant="permanent"
            PaperProps={{
              sx: {
                width: NAV_WIDTH,
                bgcolor: 'background.default',
                borderRightStyle: 'dashed',
              },
            }}
          >
            <DrawerContent isOpen={openDesktopNav} isMiniDrawer={!openDesktopNav} />
          </StyledDrawer>
        </>
      ) : (
        <Drawer
          open={openMobileNav}
          onClose={onCloseMobileNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          <DrawerContent isOpen={openMobileNav} isMiniDrawer={false} />
        </Drawer>
      )}
    </Box>
  );
}
