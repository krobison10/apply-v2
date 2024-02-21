'use client';

import React from 'react';
import PropTypes from 'prop-types';
import ApplicationsCardMenu from '@/components/applications_feed/ApplicationCardMenu';
import {Chip, Divider, Stack, Typography} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';


// const MAX_DESCRIPTION_LENGTH = 200;

/**
 * Application card component for the ApplicationsFeed
 * @param {Object} data Application object from the API response
 * @return {React.Component}
 */
export default function ApplicationCard({data}) {
  /**
   *
   * @param {string} description
   * @return {string}
   */
  // function displayDescription(description) {
  //   if (description.length > MAX_DESCRIPTION_LENGTH) {
  //     description = description.slice(0, MAX_DESCRIPTION_LENGTH + 1);
  //     description += '...';
  //   }
  //   return description;
  // }

  /**
   * Formats a field in the component card
   * @param {React.ReactNode} children
   * @return {React.Component}
   */
  function Field({children}) {
    return (
      <span className="font-semibold">{children}</span>
    );
  }
  Field.propTypes = {
    children: PropTypes.any,
  };

  const status = data.status.charAt(0).toUpperCase() + data.status.slice(1).toLowerCase();

  let statusChipColor = 'default';
  let statusChipVariant = 'filled';

  switch (data.status) {
    case 'not submitted':
      statusChipColor = 'default';
      statusChipVariant = 'outlined';
      break;
    case 'submitted':
      statusChipColor = 'default';
      statusChipVariant = 'filled';
      break;
    case 'interviewing':
      statusChipColor = 'success';
      statusChipVariant = 'filled';
      break;
    case 'offered':
      statusChipColor = 'success';
      statusChipVariant = 'filled';
      break;
    case 'rejected':
      statusChipColor = 'warning';
      statusChipVariant = 'filled';
      break;
    case 'accepted':
      statusChipColor = 'success';
      statusChipVariant = 'filled';
      break;
    default:
      statusChipColor = 'default';
      statusChipVariant = 'filled';
  }

  const renderDate = () => {
    return new Date(data.created_at)
        .toLocaleDateString(
            'en-US', {
              weekday: 'short',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short',
            });
  };

  return (
    <div className="rounded-lg relative p-4 my-4 shadow-sm bg-white">
      <ApplicationsCardMenu aid={data.aid}/>

      {/* Top row */}
      <div style={{width: 'calc(100% - 3rem)'}} className='flex items-center -mr-20'>
        <ArticleIcon className="text-primary inline-block w-10 h-10"/>
        <Typography variant="h6" className="ml-1 font-semibold inline-block">{data.position_title}</Typography>
        <Divider orientation="vertical" variant="middle" className='ml-2 mr-1 text-primary' flexItem />
        <Typography variant="h6" className="ml-1 font-semibold inline-block">{data.company_name}</Typography>
      </div>

      {/* Second row */}
      <Stack direction="row" className='mt-2' spacing={1}>
        <Chip size='small' label={status} color={statusChipColor} variant={statusChipVariant} className='select-none cursor-pointer' />
        {/* Interviews will go here */}
      </Stack>

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
          {renderDate()}
        </Typography>
      </div>
    </div>
  );
}

ApplicationCard.propTypes = {
  data: PropTypes.object,
};
