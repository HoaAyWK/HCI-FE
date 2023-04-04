import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import {
  IconButton,
  Avatar,
  Stack,
  Divider,
  Box,
  MenuItem,
  Popover,
  Typography,
  Link
} from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

const MENU_OPTIONS = [
  {
    label: "Home",
    icon: "eva:home-fill",
    path: '/'
  },
  {
    label: "Profile",
    icon: "eva:person-fill",
    path: '/profile'
  },
  {
    label: "Settings",
    icon: "eva:settings-2-fill",
    path: '/settings'
  },
];

const AccountPopover = ({ user, menuOptions }) => {
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <Avatar />
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            "& .MuiMenuItem-root": {
              typography: "body2",
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            Sioay
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            sioay@gmail.com
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {menuOptions.map((option) => (
            <Link
              key={option.label}
              component={RouterLink}
              to={option.path}
              underline='none'
              color='text.primary'
              onClick={handleClose}
            >
              <MenuItem>
                {option.label}
              </MenuItem>
            </Link>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem onClick={handleClose} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
};

export default AccountPopover;
