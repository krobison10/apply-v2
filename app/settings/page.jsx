import React from 'react';

import InternalPageLayoutV1 from '@/components/layouts/InternalPageLayout';

export const metadata = {
  title: 'Apply | Settings',
};

/**
 * Settings page
 * @return {React.Component}
 */
export default function Settings() {
  return (
    <InternalPageLayoutV1>
      <div className='flex items-center justify-center h-screen'>
        <h1>Settings</h1>
      </div>
    </InternalPageLayoutV1>
  );
}

