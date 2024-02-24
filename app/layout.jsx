// Internal modules
import '@/styles/global.css';
import ThemeProviders from '@/components/providers/themeProviders';
import GlobalProviders from '@/components/providers/globalProviders';
import React from 'react';
import PropTypes from 'prop-types';
import AlertComponent from '@/components/alertComponent';

export const metadata = {
  title: 'Apply',
  description: 'Apply: Job application and interview tracker',
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </head>
      <body>
        <ThemeProviders>
          <GlobalProviders>
            <AlertComponent />
            {children}
          </GlobalProviders>
        </ThemeProviders>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.any,
};
