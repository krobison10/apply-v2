import React from 'react';
import Link from 'next/link';

/**
 *
 * @return {React.Component}
 */
function TopBar() {
  return (
    <div
      className='z-10 fixed w-full h-14 border-b-2flex justify-between
      items-center'
    >
      <Link href={'/'} className='font-bold p-2 inline-block my-auto ml-2'>
        <img src='/Logo.png' style={{width: '100px'}}/>
      </Link>
      <div className='w-96 border-2 h-10 my-auto rounded-md mx-auto flex'>
        <p className='my-auto ml-2'>Search</p>
      </div>
      <button className='btn btn-success'>
        Create
      </button>
      <div
        className='w-10 h-10 border-2 rounded-full flex items-center
        justify-center my-auto mr-2 ml-2'
      >
        <p className='font-bold'>PFP</p>
      </div>
    </div>
  );
}

export default TopBar;
