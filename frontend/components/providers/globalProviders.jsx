'use client';
import React from 'react';
import PropTypes from 'prop-types';
import {AlertProvider} from '@/context/alertContext';
import {ConfirmProvider} from 'material-ui-confirm';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LicenseInfo} from '@mui/x-date-pickers-pro';

LicenseInfo.setLicenseKey('6681dc824cfa69f8203eb1b0de4b3f86Tz04NDg0MCxFPTE3NDAyMTEzNzIwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');


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
