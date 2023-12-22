import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import SideDrawer from '@/components/SideDrawer';
import TopBar from '@/components/TopBar';
import React from 'react';

export const metadata = {
  title: 'Apply',
  description: 'Apply: Job application and interview tracker',
};

/**
 * Root layout for all pages, includes top and sidebar components
 * @param {*} children
 * @return {React.Component}
 */
export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="h-screen w-full flex flex-col">
        <div className="fixed top-0 w-full z-10">
          {' '}
          {/* Adjust z-index if needed */}
          <TopBar />
        </div>
        <div className="flex flex-grow overflow-hidden pt-14">
          <aside className="h-full fixed w-64">
            <SideDrawer />
          </aside>
          <div className="flex-grow ml-64 overflow-auto bg-gray-50">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: React.ReactNode,
};
