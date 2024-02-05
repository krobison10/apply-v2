'use client';

import React from 'react';
import Link from 'next/link';
import CreateApplicationModal from '@/components/applications/create/CreateApplicationModal';

/**
 *
 * @return {React.Component}
 */
function TopBar() {
  return (
    <div className='z-10 fixed w-full h-16 shadow-sm flex justify-between items-center bg-base-100'>

      <Link href={'/'} className='font-bold p-2 inline-block my-auto ml-2'>
        <img src='/Logo.png' style={{width: '100px'}}/>
      </Link>

      <input type="text" placeholder="Search" className="input input-bordered w-96" />

      <div className='flex items-center'>
        <button className="hidden md:inline-block lg:inline-block btn btn-success"
          onClick={()=>document.getElementById('create_app_modal').showModal()}>Create Application</button>
        <CreateApplicationModal id={'create_app_modal'} title={'Create Application'} />

        <div className="avatar online mx-3">
          <div className="w-12 mx-auto hover:cursor-pointer bg-neutral text-neutral-content rounded-full">
            <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
