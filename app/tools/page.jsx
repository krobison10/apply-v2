import React from 'react';

import InternalPageLayoutV1 from '@/components/layouts/InternalPageLayout';
import Tools from '@/components/tools/Tools';

export const metadata = {
  title: 'Tools | Apply',
};

/**
 * Tools page
 * @return {React.Component}
 */
export default function ToolsPage() {
  return (
    <InternalPageLayoutV1>
      <Tools />
    </InternalPageLayoutV1>
  );
}

