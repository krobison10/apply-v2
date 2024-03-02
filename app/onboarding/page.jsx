import React from 'react';

import ExternalPageLayoutV1 from '@/components/layouts/externalPageLayout';
import Onboarding from '@/components/auth/Onboarding';

export const metadata = {
  title: 'Log In | Apply',
};

/**
 * Onboarding page
 * @return {React.Component}
 */
export default function LoginPage() {
  return (
    <ExternalPageLayoutV1>
      <Onboarding />
    </ExternalPageLayoutV1>
  );
}
