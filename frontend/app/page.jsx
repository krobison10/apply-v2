import React from 'react';

import InternalPageLayoutV1 from '@/components/layouts/InternalPageLayout';

export const metadata = {
  title: 'Apply',
};

/**
 * Root page
 * @return {React.Component}
 */
export default function Root() {
  return (
    <InternalPageLayoutV1>
      <div className='flex items-center justify-center h-screen'>
        <h1>Root</h1>
      </div>
    </InternalPageLayoutV1>
  );
}

