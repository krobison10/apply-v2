import React from 'react';

import InternalPageLayoutV1 from '@/components/layouts/InternalPageLayout';

export const metadata = {
  title: 'Apply | Blog',
};

/**
 * Blog page
 * @return {React.Component}
 */
export default function Blog() {
  return (
    <InternalPageLayoutV1>
      <div className='flex items-center justify-center h-screen'>
        <h1>Blog</h1>
      </div>
    </InternalPageLayoutV1>
  );
}

