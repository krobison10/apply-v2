import React from 'react';

import InternalPageLayoutV1 from '@/components/layouts/InternalPageLayout';
import InterviewsFeed from '@/components/interviews_feed/InterviewsFeed';

export const metadata = {
  title: 'Apply | Interviews',
};

/**
 * Interviews page
 * @return {React.Component}
 */
export default function Interviews() {
  return (
    <InternalPageLayoutV1>
      <InterviewsFeed />
    </InternalPageLayoutV1>
  );
}

