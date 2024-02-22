import React from 'react';
import PropTypes from 'prop-types';

export const metadata = {
  title: 'Apply',
  description: 'Apply: Job application and interview tracker',
};

function ExternalPageLayoutV1({children}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className='h-16 w-full flex items-center'>
        <img src='/Logo.png' className='w-[100px] ml-4'/>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="h-16 w-full flex items-center justify-center">
        © 2024 | Version 1.4.2 | Made with ❤️ by Kyler Robison
      </footer>
    </div>
  );
}

ExternalPageLayoutV1.propTypes = {
  children: PropTypes.any,
};

export default ExternalPageLayoutV1;
