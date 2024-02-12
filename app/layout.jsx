// Internal modules
import './global.css';
import ThemeProviders from '@/app/theme_providers';
import React from 'react';

export const metadata = {
  title: 'Apply',
  description: 'Apply: Job application and interview tracker',
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body>
        <ThemeProviders>
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: React.ReactNode,
};
