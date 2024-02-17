'use client';

import React from 'react';
import PropTypes from 'prop-types';
import InterviewCardMenu from '@/components/interviews_feed/InterviewCardMenu';
import {Divider, Typography} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';


export default function InterviewCard({data}) {
  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      weekday: 'long', // "Monday" through "Sunday"
      year: 'numeric', // Numeric year
      month: 'long', // "January" through "December"
      day: 'numeric', // Numeric day of the month
      hour: '2-digit', // 2-digit hour
      minute: '2-digit', // 2-digit minute
      hour12: true, // 12-hour time
    });
  };

  return (
    <div className="rounded-lg relative p-4 mb-4 shadow-sm bg-white">
      <InterviewCardMenu iid={data.iid}/>

      {/* Top row */}
      <div style={{width: 'calc(100% - 3rem)'}} className='flex items-center -mr-20'>
        <BusinessIcon className="text-primary inline-block w-10 h-10"/>
        <Typography variant="h6" className="ml-1 font-semibold inline-block">{data.position_title}</Typography>
        <Divider orientation="vertical" variant="middle" className='ml-2 mr-1 text-primary' flexItem />
        <Typography variant="h6" className="ml-1 font-semibold inline-block">{data.company_name}</Typography>
      </div>

      {/* Second row */}
      <div className='w-full'>
        <Typography variant="body1" className="mt-2 font-semibold">{formatDate(data.date)}</Typography>
      </div>

      {/* Third row */}
      <div className='w-full'>
        <Typography variant="body2" className="mt-2">
          <span className='font-semibold'>{data.notes?.length > 0 ? 'Notes: ' : ''}</span>
          {data.notes}
        </Typography>
      </div>

      {/* Fourth row */}
      <div className='w-full'>
        <Typography variant="body2" className="mt-2 text-bold">
          <span className='font-semibold'>Created: </span>
          {formatDate(data.created_at)}
        </Typography>
      </div>
    </div>
  );
}

InterviewCard.propTypes = {
  data: PropTypes.object,
};
