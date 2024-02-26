'use client';

import React, {useState, useEffect} from 'react';
import ApplicationView from '@/components/applications/ApplicationView';
import {Typography} from '@mui/material';
import InterviewsView from '@/components/applications/InterviewsView';

export default function ApplicationPage() {
  const [aid, setAid] = useState(null);

  // get aid from url
  useEffect(() => {
    setAid(window.location.href.split('?aid=')[1]);
  }, []);

  return (
    <div className='p-8'>
      <div className='max-w-[1200px] mx-auto'>
        <Typography variant='h4' className='my-1'>Application</Typography>
        <ApplicationView aid={parseInt(aid)} />
        <Typography variant='h4' className='my-8 mb-6'>Interviews</Typography>
        <InterviewsView aid={parseInt(aid)} />
      </div>
    </div>

  );
}
