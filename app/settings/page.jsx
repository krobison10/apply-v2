import React from 'react';

import InternalPageLayoutV1 from '@/components/layouts/InternalPageLayout';
import Settings from '@/components/settings/Settings';

export const metadata = {
  title: 'Settings | Apply',
};

/**
 * Settings page
 * @return {React.Component}
 */
export default function SettingsPage() {
  return (
    <InternalPageLayoutV1>
      <Settings />
    </InternalPageLayoutV1>
  );
}

