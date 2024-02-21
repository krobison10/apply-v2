'use client';

import React from 'react';

import {useEffect, useState} from 'react';
import ApplicationCard from './ApplicationCard';
import {useApi} from '@/hooks/queries/useApi';
import {Typography} from '@mui/material';
import CreateModalButton from '@/components/CreateModalButton';
import LoadingSpinner from '@/components/common/loadingSpinner';
import useApplicationsFeedURL from '@/hooks/queries/useApplicationsFeedURL';
import ApplicationsFeedParams from '@/components/applications_feed/ApplicationsFeedParams';


const defaultSearchParams = {
  priority_filters: [],
  status_filters: [],
  from_days_ago: null,
  to_days_ago: null,
  sort: 'created_at',
  order: 'desc',
};

/**
 * Infinite scroll feed for the applications
 * @return {React.Component}
 */
export default function ApplicationsFeed() {
  const [searchParams, setSearchParams] = useState({...defaultSearchParams});

  useEffect(() => {
    let params;
    if (params = localStorage.getItem('applicationFeedParams')) {
      setSearchParams(JSON.parse(params));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('applicationFeedParams', JSON.stringify(searchParams));
  }, [searchParams]);

  const dataUrl = useApplicationsFeedURL(searchParams, 100, 0);

  // eslint-disable-next-line no-unused-vars
  const [data, isLoading, error, setError, getApplications] = useApi('GET', dataUrl);

  useEffect(() => {
    getApplications();
  }, [searchParams]);

  function clearParams() {
    setSearchParams({...defaultSearchParams});
  }

  function renderNoApplications() {
    return (
      <div className='flex justify-center items-center w-full mt-[360px]'>
        <div className='w-96'>
          <Typography variant='h5' className='font-bold text-center'>No applications found!</Typography>
          <Typography variant='body1' className='text-center'>Try adjusting your filters or create some more</Typography>
          <div className='flex justify-center pt-4'>
            <CreateModalButton/>
          </div>
        </div>
      </div>
    );
  };

  function renderList() {
    return (
      <>
        <ApplicationsFeedParams params={searchParams} setParams={setSearchParams} clearParams={clearParams}/>
        {data?.results && (
          <div className='h-10 w-full my-4 flex items-center justify-end'>
            <Typography
              variant='subtitle2'
              className='display-block'>
              {`${data.metadata.total_results} Application${data.metadata.total_results === 1 ? '' : 's'}`}
            </Typography>
          </div>
        )}
        <div>
          {data?.results?.length > 0 && data.results.map((application) => (
            <ApplicationCard key={application.aid} data={application} />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className='max-w-[1200px] mx-auto h-full'>
      <div className='p-8'>
        {renderList()}
      </div>
      {isLoading && <LoadingSpinner loading/>}
      {data?.results?.length === 0 && renderNoApplications()}
    </div>
  );
}
