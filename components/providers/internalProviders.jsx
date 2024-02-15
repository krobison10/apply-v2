'use client';
import React from 'react';
import PropTypes from 'prop-types';
import {UserProvider} from '@/context/userContext';

export default function InternalProviders({children}) {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
}

InternalProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
