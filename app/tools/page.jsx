import React from 'react';

import InternalPageLayoutV1 from '@/components/layouts/InternalPageLayout';

export const metadata = {
  title: 'Tools | Apply',
};

/**
 * Tools page
 * @return {React.Component}
 */
export default function Tools() {
  return (
    <InternalPageLayoutV1>
      <div className='flex items-center justify-center h-screen'>
        <h1>Tools</h1>
      </div>
    </InternalPageLayoutV1>
  );
}

