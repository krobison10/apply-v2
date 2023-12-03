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
    <html lang='en'>
      <body className='h-screen w-full flex flex-col'>
        <div className='fixed top-0 w-full z-10'> {/* Adjust z-index if needed */}
          <TopBar/>
        </div>
        <div className='flex flex-grow overflow-hidden pt-14'>
          <aside className='h-full fixed w-64'> 
            <SideDrawer/>
          </aside>
          <div className='flex-grow ml-64 overflow-auto'>
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
