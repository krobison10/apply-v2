'use client';

import React from 'react';
import PropTypes from 'prop-types';
import InterviewCardMenu from '@/components/interviews_feed/InterviewCardMenu';
import {Divider, Typography} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import {formatSinceDateNicely} from '@/utils/helpers';
import faviconFetch from 'favicon-fetch';

export default function InterviewCard({data}) {
  function renderIcon() {
    const faviconUrl = data.company_website && faviconFetch({uri: data.company_website});
    if (faviconUrl) {
      return <img className='m-1 w-10 h-10' src={faviconUrl} alt={data.company_name} width={36} height={36}/>;
    } else {
      return <BusinessIcon className="text-primary-dark inline-block w-10 h-10"/>;
    }
  }

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

  function renderDate() {
    if (data.created_at === data.updated_at) {
      return <>Created {formatSinceDateNicely(data.created_at)}</>;
    } else {
      return <>Edited {formatSinceDateNicely(data.updated_at)}</>;
    }
  };

  return (
    <div className="rounded-lg relative p-4 mb-4 shadow-sm bg-white">
      <InterviewCardMenu iid={data.iid} aid={data.aid}/>

      <div style={{width: 'calc(100% - 3rem)'}} className='flex items-center -mr-20'>
        <div className='flex items-center'>
          {renderIcon()}
          <Typography variant="h6" className="ml-1 font-semibold inline-block">{data.company_name}</Typography>
        </div>
        <Divider className='mx-2 h-8' orientation="vertical" variant="middle" flexItem />
        <div className='flex items-center'>
          <Typography variant="h6" className="ml-0 font-semibold inline-block">{data.position_title}</Typography>
        </div>
        {data.job_location && <><Divider className='mx-2 h-8' orientation="vertical" variant="middle" flexItem />
          <div className='flex items-center'>
            <Typography className='ml-0' variant="body1">{data.job_location}</Typography>
          </div></>}
      </div>

      <div className='w-full'>
        <Typography variant="body2" className="mt-2 font-semibold">{formatDate(data.date)}</Typography>
      </div>

      <div className='w-full inline-block'>
        <Typography variant="subtitle2" className="mt-2 inline-block">
            Type:
        </Typography>
        <Typography variant="body2" className="ml-1 inline-block">
          {data.type || 'Not specified'}
        </Typography>
      </div>

      <div className='w-full inline-block'>
        <Typography variant="subtitle2" className="mt-2">
            Notes:
        </Typography>
        <Typography variant="body2" className="line-clamp-3">
          {data.notes}
        </Typography>
      </div>

      <div className='w-full'>
        <Typography variant="body2" className="mt-2 text-bold">
          {renderDate()}
        </Typography>
      </div>
    </div>
  );
}

InterviewCard.propTypes = {
  data: PropTypes.object,
};
