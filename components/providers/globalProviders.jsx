'use client';
import React from 'react';
import PropTypes from 'prop-types';
import {AlertProvider} from '@/context/alertContext';
import {ConfirmProvider} from 'material-ui-confirm';

export default function GlobalProviders({children}) {
  return (
    <AlertProvider>
      <ConfirmProvider>
        {children}
      </ConfirmProvider>
    </AlertProvider>
  );
}

GlobalProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
