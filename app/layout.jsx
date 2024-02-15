// Internal modules
import '@/styles/global.css';
import ThemeProviders from '@/components/providers/themeProviders';
import GlobalProviders from '@/components/providers/globalProviders';
import React from 'react';
import PropTypes from 'prop-types';

export const metadata = {
  title: 'Apply',
  description: 'Apply: Job application and interview tracker',
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <ThemeProviders>
          <GlobalProviders>
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
