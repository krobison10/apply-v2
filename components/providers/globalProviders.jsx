'use client';
import React from 'react';
import PropTypes from 'prop-types';
import {AlertProvider} from '@/context/alertContext';
import {ConfirmProvider} from 'material-ui-confirm';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';


export default function GlobalProviders({children}) {
  return (
    <AlertProvider>
      <ConfirmProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          {children}
        </LocalizationProvider>
      </ConfirmProvider>
    </AlertProvider>
  );
}

GlobalProviders.propTypes = {
  children: PropTypes.node.isRequired,
};
