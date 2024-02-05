import ApplicationsFeed from '@/components/applications_feed/ApplicationsFeed';
import React from 'react';

export const metadata = {
  title: 'Apply | Applications',
};

/**
 * Applications page
 * @return {React.Component}
 */
export default async function Applications() {
  return (
    <main>
      <ApplicationsFeed/>
    </main>
  );
}

