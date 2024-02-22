'use client';

import React from 'react';
import PropTypes from 'prop-types';
import ApplicationsCardMenu from '@/components/applications_feed/ApplicationCardMenu';
import {Chip, Divider, Stack, Typography} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import LinkIcon from '@mui/icons-material/Link';
import {formatSinceDateNicely} from '@/utils/helpers';
import faviconFetch from 'favicon-fetch';

/**
 * Application card component for the ApplicationsFeed
 * @param {Object} data Application object from the API response
 * @return {React.Component}
 */
export default function ApplicationCard({data}) {
  const status = data.status.charAt(0).toUpperCase() + data.status.slice(1).toLowerCase();

  let statusChipColor = '';
  let statusChipVariant = '';

  switch (data.status) {
    case 'not submitted':
      statusChipColor = 'default';
      statusChipVariant = 'outlined';
      break;
    case 'submitted':
      statusChipColor = 'default';
      statusChipVariant = 'filled';
      break;
    case 'responded':
      statusChipColor = 'success';
      statusChipVariant = 'filled';
      break;
    case 'rejected':
      statusChipColor = 'warning';
      statusChipVariant = 'filled';
      break;
    case 'interviewing':
      statusChipColor = 'success';
      statusChipVariant = 'filled';
      break;
    case 'offer received':
      statusChipColor = 'success';
      statusChipVariant = 'filled';
      break;
    case 'withdrawn':
      statusChipColor = 'default';
      statusChipVariant = 'filled';
      break;
    case 'withdrawn':
      statusChipColor = 'default';
      statusChipVariant = 'filled';
      break;
    default:
      statusChipColor = 'default';
      statusChipVariant = 'outlined';
  }

  function renderIcon() {
    const faviconUrl = data.company_website && faviconFetch({uri: data.company_website});
    if (faviconUrl) {
      return <img className='m-1 w-10 h-10' src={faviconUrl} alt={data.company_name} width={36} height={36}/>;
    } else {
      return <ArticleIcon className="text-primary-dark inline-block w-10 h-10"/>;
    }
  }

  function renderDate() {
    if (data.created_at === data.updated_at) {
      return <>Created {formatSinceDateNicely(data.created_at)}</>;
    } else {
      return <>Edited {formatSinceDateNicely(data.updated_at)}</>;
    }
  };

  return (
    <div className="rounded-lg relative p-4 my-4 shadow-sm bg-white">
      <ApplicationsCardMenu aid={data.aid}/>

      {/* Top row */}
      <div style={{width: 'calc(100% - 3rem)'}} className='flex items-center flex-wrap -mr-20 line-clamp-1'>
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

      {/* Second row */}
      <Stack direction="row" className='mt-2' spacing={1}>
        <Chip size='small' label={status} color={statusChipColor} variant={statusChipVariant} className='select-none cursor-pointer' />
        {data.posting_url && <Chip size='small' icon={<LinkIcon />} label="Posting" onClick={() => {
          window.open(data.posting_url, '_blank', 'noopener,noreferrer');
        }} />}
        <Chip size='small' icon={<ArticleIcon />} label="Resume" onClick={() => {}} />
        <Chip size='small' icon={<ArticleIcon />} label="Cover letter" onClick={() => {}} />
        {/* Interviews will go here */}
      </Stack>

      {/* Third row */}
      <div className='w-full inline-block'>
        <Typography variant="subtitle2" className="mt-2">
          Notes:
        </Typography>
        <Typography variant="body2" className="line-clamp-3">
          {data.notes}
        </Typography>
      </div>

      {/* Fourth row */}
      <div className='w-full'>
        <Typography variant="body2" className="mt-2 text-bold">
          {renderDate()}
        </Typography>
      </div>
    </div>
  );
}

ApplicationCard.propTypes = {
  data: PropTypes.object,
};
