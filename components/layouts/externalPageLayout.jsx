import React from 'react';
import PropTypes from 'prop-types';

export const metadata = {
  title: 'Apply',
  description: 'Apply: Job application and interview tracker',
};

function ExternalPageLayoutV1({children}) {
  return (
    <>
      {children}
    </>
  );
}

ExternalPageLayoutV1.propTypes = {
  children: PropTypes.any,
};

export default ExternalPageLayoutV1;
