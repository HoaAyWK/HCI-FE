import React from "react";
import { Container, Typography, Box, Grid, Avatar } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

import { Page } from "../components";

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  borderRadius: "0%",
  padding: 2,
  [theme.breakpoints.up("xs")]: {
    width: 100,
    height: "auto",
  },
  [theme.breakpoints.up("sm")]: {
    width: 150,
    height: "auto",
  },
}));

const BoxStyle = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SectionStyle = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.01),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBlockEnd: 2,
  flexDirection: "column",
  marginBlockStart: 5,
}));

const HomePage = () => {
  return (
    <Page title="Home">
      <Container maxWidth="lg"></Container>
    </Page>
  );
};

export default HomePage;
