'use client';

import React from 'react';
import PropTypes from 'prop-types';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import {StyledEngineProvider} from '@mui/material/styles';
import {Inter} from 'next/font/google';
import {createTheme} from '@mui/material/styles';

// eslint-disable-next-line new-cap
// const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
// });

// eslint-disable-next-line new-cap
const inter = Inter({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// cool red color #D23A3A
// https://mui.com/material-ui/customization/color/
const theme = createTheme({
  typography: {
    fontFamily: inter.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#1D2D44',
    },
    secondary: {
      main: '#DCBF85',
    },
    success: {
      main: '#2C5530',
      contrastText: '#FAFAFA',
    },
    warning: {
      main: '#eb7534',
      contrastText: '#FAFAFA',
    },
    error: {
      main: '#D23A3A',
      contrastText: '#FAFAFA',
    },
    background: {
      default: '#fcfaf9',
      paper: '#FAFAFA',
    },
    text: {
      primary: '#1C1C1C',
      secondary: '#242424',
      disabled: '#A9A9A9',
    },
  },
});


export default function ThemeProviders({children}) {
  return (
    <StyledEngineProvider injectFirst>
      <AppRouterCacheProvider options={{enableCssLayer: true}}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppRouterCacheProvider>
    </StyledEngineProvider>
  );
}

ThemeProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
