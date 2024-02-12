'use client';

import React from 'react';
import PropTypes from 'prop-types';
import {CssBaseline, ThemeProvider} from '@mui/material';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import {StyledEngineProvider} from '@mui/material/styles';
import {Roboto} from 'next/font/google';
import {createTheme} from '@mui/material/styles';

// eslint-disable-next-line new-cap
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  palette: {
    primary: {
      main: '#2D6A80',
    },
    secondary: {
      main: '#1f4a59',
    },
    // Add additional color settings as needed
    success: {
      main: '#b9f030',
      contrastText: '#192232', // Assuming a dark color provides contrast
    },
    warning: {
      main: '#E67A3E',
      contrastText: '#192232', // Assuming a dark color provides contrast
    },
    error: {
      main: '#E74C3C',
      contrastText: '#FEFEFE',
    },
    background: {
      default: '#FEFEFE',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1C1C1C',
      secondary: '#192232',
      disabled: '#F5F3F3',
    },
  },
  // components: {
  //   MuiPopover: {
  //     defaultProps: {
  //       container: rootElement,
  //     },
  //   },
  //   MuiPopper: {
  //     defaultProps: {
  //       container: rootElement,
  //     },
  //   },
  //   MuiDialog: {
  //     defaultProps: {
  //       container: rootElement,
  //     },
  //   },
  //   MuiModal: {
  //     defaultProps: {
  //       container: rootElement,
  //     },
  //   },
  // },
});


export default function ThemeProviders({children}) {
  return (
    <AppRouterCacheProvider options={{enableCssLayer: true}}>
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          {children}
        </StyledEngineProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}

ThemeProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
