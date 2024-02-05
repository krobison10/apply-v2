import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';
import SideDrawer from '@/components/nav/SideDrawer';
import TopBar from '@/components/nav/TopBar';
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
    <html lang="en" data-theme="light">
      <body className="h-screen w-full flex flex-col bg-base-100">
        <div className="fixed top-0 w-full z-10">
          <TopBar />
        </div>
        <div className="flex flex-grow overflow-hidden pt-16">
          <aside className="h-full fixed w-64">
            <SideDrawer />
          </aside>
          <div className="flex-grow ml-64 overflow-auto">
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
