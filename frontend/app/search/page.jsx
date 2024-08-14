import React from 'react';
import InternalPageLayoutV1 from '@/components/layouts/InternalPageLayout';
import SearchPage from './search';

export const metadata = {
  title: 'Search | Apply',
};

/**
 * Search page
 * @return {React.Component}
 */
export default function Search() {
  return (
    <InternalPageLayoutV1>
      <SearchPage />
    </InternalPageLayoutV1>
  );
}

