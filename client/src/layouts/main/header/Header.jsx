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
  useMediaQuery
} from "@mui/material";
// utils
// components
import { Iconify } from '../../../components';
//
import AvatarPopover from "./AvatarPopover";
import Searchbar from "./Searchbar";
import { useAppTheme, useAppThemeUpdate } from "../../../context/AppThemeContext";
import { useLocalStorage } from "../../../hooks";

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
  const [modeValueStored, setModeValueStored] = useLocalStorage('darkMode', null);

  const { setLightMode, setDarkMode } = useAppThemeUpdate();

  const applyLightMode = () => {
    setLightMode();
    setModeValueStored(false);
  };

  const applyDarkMode = () => {
    setDarkMode();
    setModeValueStored(true);
  };

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
            sx={{ color: "text.primary" }}
          >
            HCI
          </Typography>
        </Box>

        <Searchbar />

        <Stack direction='row' spacing={2}>
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
          <IconButton onClick={applyLightMode}>
            <Iconify icon='ic:twotone-light-mode' width={24} height={24} />
          </IconButton>
          <IconButton onClick={applyDarkMode}>
            <Iconify icon='material-symbols:dark-mode' width={24} height={24} />
          </IconButton>
          <AvatarPopover />
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  );
}
