'use client';

import React, {useState, useEffect} from 'react';
import ApplicationView from '@/components/applications/ApplicationView';
import {Typography} from '@mui/material';

export default function ApplicationPage() {
  const [aid, setAid] = useState(null);

  // get aid from url
  useEffect(() => {
    setAid(window.location.href.split('?aid=')[1]);
  }, []);

  return (
    <div className='m-8'>
      <Typography variant='h4' className='my-1'>Manage Application</Typography>
      <ApplicationView aid={parseInt(aid)} />
    </div>
  );
}
