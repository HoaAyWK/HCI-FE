import PropTypes from "prop-types";
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled, alpha } from "@mui/material/styles";
import {
  Box,
  Button,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Link,
  useMediaQuery,
  Badge
} from "@mui/material";
// utils
// components
import { Iconify } from '../../../components';
//
import AvatarPopover from "./AvatarPopover";
import { useAppThemeUpdate, useAppTheme } from "../../../context/AppThemeContext";
import { useLocalStorage } from "../../../hooks";
import AlgoliaSearch from './search-bar/AlgoliaSearch';

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  width: `100%`,
  WebkitBackdropFilter: "blur(6px)",
  backdropFilter: "blur(6px)",
  backgroundColor: alpha(theme.palette.background.default, 0.5),
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

const menuItems = [
  {
    name: 'Products',
    path: '/products'
  }
];

export default function Header({ onOpenNav }) {
  const [, setModeValueStored] = useLocalStorage('darkMode', null);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const darkTheme = useAppTheme();
  const { setLightMode, setDarkMode } = useAppThemeUpdate();

  const applyLightMode = () => {
    setLightMode();
    setModeValueStored(false);
  };

  const applyDarkMode = () => {
    setDarkMode();
    setModeValueStored(true);
  };

  const toggleTheme = (isDark) => () => {
    if (isDark === null) {
      if (prefersDarkMode) {
        applyLightMode();
      } else {
        applyLightMode();
      }
    } else if (isDark === false) {
      applyDarkMode();
    } else {
      applyLightMode();
    }
  };

  const icon = () => {
    if (darkTheme === null) {
      if (prefersDarkMode)
        return 'ic:twotone-light-mode';
      else
        return 'material-symbols:dark-mode';
    } else if (darkTheme === false) {
      return 'material-symbols:dark-mode';
    } else {
      return 'ic:twotone-light-mode';
    }
  }

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={onOpenNav}
          sx={{
            mr: 1,
            color: "text.primary",
            display: { lg: "none" },
          }}
        >
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Box>
          <Typography
            variant="h3"
            component="span"
            sx={{ color: "text.primary", mr: 2 }}
          >
            HCI
          </Typography>
        </Box>

        <AlgoliaSearch />

        <Stack direction='row' spacing={2} sx={{ ml: 2 }}>
          {menuItems.map((item) => (
            <Link key={item.name} component={RouterLink} to={item.path} underline='none' color='text.primary'>
              <Button>
                {item.name}
              </Button>
            </Link>
          ))}
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          <IconButton onClick={toggleTheme(darkTheme)}>
            <Iconify icon={icon()} width={24} height={24} />
          </IconButton>

          <Link component={RouterLink} to='/checkout' underline='none'>
            <IconButton size='medium' color='default'>
              <Badge badgeContent={4} color='error'>
                <Iconify icon='ic:outline-shopping-cart' width={28} height={28} />
              </Badge>
            </IconButton>
          </Link>

          <AvatarPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
