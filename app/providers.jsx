import React from 'react';
import PropTypes from 'prop-types';
import {AlertProvider} from '@/context/alertContext';

export default function Providers({children}) {
  return (
    <AlertProvider>
      {children}
    </AlertProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
