import React from 'react';

import InternalPageLayoutV1 from '@/components/layouts/InternalPageLayout';

export const metadata = {
  title: 'Apply | Dashboard',
};

/**
 * Home page
 * @return {React.Component}
 */
export default function Home() {
  return (
    <InternalPageLayoutV1>
      <div className="flex items-center justify-center h-screen">
        <h1>Home</h1>
      </div>
    </InternalPageLayoutV1>
  );
}
