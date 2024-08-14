import React from 'react';
import InternalPageLayoutV1 from '@/components/layouts/InternalPageLayout';
import dynamic from 'next/dynamic';
const ApplicationsFeed = dynamic(() => import('@/components/applications_feed/ApplicationsFeed'), {ssr: false});

export const metadata = {
  title: 'Applications | Apply',
};

/**
 * Applications page
 * @return {React.Component}
 */
export default function Applications() {
  return (
    <InternalPageLayoutV1>
      <ApplicationsFeed/>
    </InternalPageLayoutV1>
  );
}

