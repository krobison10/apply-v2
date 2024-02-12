'use client';

import CreateModal from '@/components/CreateModal';

import React from 'react';
import Link from 'next/link';
import {Button, Avatar} from '@mui/material';

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

        <Button variant='contained' className='mx-4' color='success'>Create</Button>

        <Avatar className='mr-4 cursor-pointer'>KR</Avatar>

        <div></div>
      </div>
    </div>
  );
}

export default TopBar;
