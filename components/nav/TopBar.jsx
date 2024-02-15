'use client';

import CreateModal from '@/components/CreateModal';

import React from 'react';
import Link from 'next/link';
import AvatarMenu from '@/components/nav/avatarMenu';
/**
 *
 * @return {React.Component}
 */
function TopBar() {
  return (
    <div className='z-10 fixed w-full h-16 flex justify-between items-center shadow-md bg-primary'>

      <Link href={'/'} className='font-bold p-2 inline-block my-auto ml-2 mt-2'>
        <img src='/Logo-white.png' style={{width: '100px'}}/>
      </Link>

      <div className='flex items-center'>
        <CreateModal />

        <AvatarMenu />
        <div></div>
      </div>
    </div>
  );
}

export default TopBar;
