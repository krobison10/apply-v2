// Internal modules
import SideDrawer from '@/components/nav/SideDrawer';
import TopBar from '@/components/nav/TopBar';
import React from 'react';
import PropTypes from 'prop-types';

export const metadata = {
  title: 'Apply',
  description: 'Apply: Job application and interview tracker',
};

function InternalPageLayoutV1({children}) {
  return (
    <>
      <div className="h-screen w-full flex flex-col">
        <div className="fixed top-0 w-full z-10 ">
          <TopBar/>
        </div>
        <div className="flex flex-grow overflow-hidden pt-16">
          <aside className="h-full fixed w-64 shadow-md bg-[#fcfaf9]">
            <SideDrawer />
          </aside>
          <div className="flex-grow ml-64 overflow-auto bg-[#fcfaf9]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

InternalPageLayoutV1.propTypes = {
  children: PropTypes.any,
};

export default InternalPageLayoutV1;
