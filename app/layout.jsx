// Internal modules
import './global.css';
import ThemeProviders from '@/app/theme_providers';
import Providers from '@/app/providers';
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
          <Providers>
            {children}
          </Providers>
        </ThemeProviders>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.any,
};
