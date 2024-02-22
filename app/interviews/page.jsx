import React from 'react';

import InternalPageLayoutV1 from '@/components/layouts/InternalPageLayout';
import dynamic from 'next/dynamic';
const InterviewsFeed = dynamic(() => import('@/components/interviews_feed/InterviewsFeed'), {ssr: false});

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
      <InterviewsFeed/>
    </InternalPageLayoutV1>
  );
}

