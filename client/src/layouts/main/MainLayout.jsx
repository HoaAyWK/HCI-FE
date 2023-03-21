import React from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';

import Header from './header/Header';

const RootStyle = styled('div')({
    minHeight: '100%',
    overflow: 'hidden'
});

export default function Layout() {

    return (
        <RootStyle>
            <Header />
            <Container maxWidth='lg' sx={{ mt: 8 }}>
              <Outlet />
            </Container>
        </RootStyle>
    );
}
