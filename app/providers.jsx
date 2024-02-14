'use client';
import React from 'react';
import PropTypes from 'prop-types';
import {AlertProvider} from '@/context/alertContext';
import {ConfirmProvider} from 'material-ui-confirm';

export default function Providers({children}) {
  return (
    <AlertProvider>
      <ConfirmProvider>
        {children}
      </ConfirmProvider>
    </AlertProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
