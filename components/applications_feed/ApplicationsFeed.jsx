'use client';

import React from 'react';

import {useEffect} from 'react';
import ApplicationCard from './ApplicationCard';
import {useApi} from '@/hooks/queries/useApi';
import {Typography} from '@mui/material';
import CreateModalButton from '@/components/CreateModalButton';
import LoadingSpinner from '@/components/common/loadingSpinner';

/**
 * Infinite scroll (soon) feed for the applications
 * @return {React.Component}
 */
export default function ApplicationsFeed() {
  // eslint-disable-next-line no-unused-vars
  const [data, isLoading, error, setError, getApplications] = useApi('GET', 'applications?expand=true');

  useEffect(() => {
    getApplications();
  }, []);

  function renderNoApplications() {
    return (
      <div className='flex justify-center items-center w-full h-full'>

        <div className='w-96'>
          <Typography variant='h5' className='font-bold text-center'>No applications found!</Typography>
          <div className='flex justify-center pt-4'>
            <CreateModalButton/>
          </div>
        </div>

      </div>
    );
  };

  return (
    <>
      {isLoading && <LoadingSpinner loading/>}
      {data?.results?.length === 0 && renderNoApplications()}
      <div className='py-4 px-8'>
        {data?.results?.length > 0 &&
        data.results.map((application) => (
          <ApplicationCard key={application.aid} data={application} />
        ))}
      </div>
    </>
  );
}
