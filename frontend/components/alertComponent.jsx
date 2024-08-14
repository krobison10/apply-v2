'use client';

import React from 'react';
import {useContext} from 'react';
import AlertContext from '@/context/alertContext';
import {Alert} from '@mui/material';

function AlertComponent() {
  const alertCtx = useContext(AlertContext);

  return (
    alertCtx?.alert !== null && (
      <div className='fixed top-24 left-1/2 transform -translate-x-1/2 w-[520px] z-[5000]'>
        <Alert variant='filled' severity={alertCtx.alert}>{alertCtx.text}</Alert>
      </div>
    )
  );
};
export default AlertComponent;
