import React from 'react';
import InternalPageLayoutV1 from '@/components/layouts/InternalPageLayout';
import ApplicationPage from '@/components/applications/ApplicationPage';
// import dynamic from 'next/dynamic';
// const ApplicationsFeed = dynamic(() => import('@/components/applications_feed/ApplicationsFeed'), {ssr: false});

export const metadata = {
  title: 'View Application | Apply',
};

/**
 * Application page
 * @return {React.Component}
 */
export default function Application() {
  return (
    <InternalPageLayoutV1>
      <ApplicationPage />
    </InternalPageLayoutV1>
  );
}

