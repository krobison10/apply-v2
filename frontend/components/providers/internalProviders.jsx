'use client';
import React from 'react';
import PropTypes from 'prop-types';
import {UserProvider} from '@/context/userContext';
import {ModalProvider} from '@/components/providers/modalProvider';

export default function InternalProviders({children}) {
  return (
    <UserProvider>
      <ModalProvider>
        {children}
      </ModalProvider>
    </UserProvider>
  );
}

InternalProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
