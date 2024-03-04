'use client';

import React from 'react';
import PropTypes from 'prop-types';
import ApplicationsCardMenu from '@/components/applications_feed/ApplicationCardMenu';
import {Divider, Typography} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';

/**
 * Application card component for the ApplicationsFeed
 * @param {Object} data Application object from the API response
 * @return {React.Component}
 */
export default function ApplicationCard({data, first, last}) {
  function renderIcon() {
    // const faviconUrl = data.company_website && faviconFetch({uri: data.company_website});
    // if (faviconUrl) {
    //   return <img className='m-1 w-10 h-10' src={faviconUrl} alt={data.company_name} width={36} height={36}/>;
    // } else {
    return <ArticleIcon className="text-primary-dark inline-block w-8 h-8"/>;
    // }
  }

  function handleClick(e) {
    const clickedOptionsButton = e.target.closest(`#application-${data.aid}-options-root`);
    if (!clickedOptionsButton) {
    }
  }

  const firstLast = `${first ? 'rounded-t-lg' : ''} ${last ? 'rounded-b-lg' : ''}`;

  return (
    <div
      className={`relative p-2 bg-white ${firstLast} flex items-center justify-between flex-nowrap cursor-pointer hover:bg-gray-100 active:bg-gray-200`}
      onClick={handleClick}
    >
      <div style={{width: 'calc(100% - 3rem)'}} className='flex items-center flex-nowrap -mr-20 line-clamp-1'>
        <div className='flex flex-nowrap items-center max-w-[30%]'>
          {renderIcon()}
          <Typography variant="body1" className="ml-1 font-semibold inline-block max-h-6 line-clamp-1">{data.company_name}</Typography>
          <Divider className='mx-2 h-8' orientation="vertical" variant="middle" flexItem />
        </div>
        <div className='flex items-center max-w-[50%]'>
          <Typography variant="body1" className="ml-0 font-semibold inline-block max-h-6 line-clamp-1">{data.position_title}</Typography>
        </div>
        {data.job_location && <><Divider className='mx-2 h-8' orientation="vertical" variant="middle" flexItem />
          <div className='flex items-center'>
            <Typography className='ml-0' variant="body1">{data.job_location}</Typography>
          </div></>}


      </div>
      <ApplicationsCardMenu aid={data.aid} data={data} className="flex items-center"/>
    </div>
  );
}

ApplicationCard.propTypes = {
  data: PropTypes.object,
  first: PropTypes.bool,
  last: PropTypes.bool,
};
