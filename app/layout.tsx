import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import SideDrawer from '@/components/SideDrawer';
import TopBar from '@/components/TopBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Apply',
  description: 'Apply: Job application and interview tracker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBar/>
        <div className='fixed top-14 left-0 h-full flex'>
          <SideDrawer/>
          <div className='relative w-screen h-full left-64 flex-grow' style={{width: 'calc(100vw - 16rem)'}}>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
