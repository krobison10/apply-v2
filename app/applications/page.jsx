import ApplicationsFeed from '@/components/ApplicationsFeed';
import React from 'react';

export const metadata = {
  title: 'Apply | Applications',
};

/**
 * Applications page
 * @return {React.Component}
 */
export default function Applications() {
  return (
    <main>
      <ApplicationsFeed/>
    </main>
  );
}

