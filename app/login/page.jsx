import React from 'react';

import ExternalPageLayoutV1 from '@/components/layouts/externalPageLayout';
import Login from '@/components/auth/login';

export const metadata = {
  title: 'Apply | Log In',
};

/**
 * Login page
 * @return {React.Component}
 */
export default function LoginPage() {
  return (
    <ExternalPageLayoutV1>
      <Login />
    </ExternalPageLayoutV1>
  );
}
