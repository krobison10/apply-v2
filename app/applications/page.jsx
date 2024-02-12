import React from 'react';

import ApplicationsFeed from '@/components/applications_feed/ApplicationsFeed';
import InternalPageLayoutV1 from '@/components/InternalPageLayout';

export const metadata = {
  title: 'Apply | Applications',
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

