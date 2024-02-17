'use client';

import React from 'react';

import {useEffect} from 'react';
import InterviewCard from '@/components/interviews_feed/InterviewCard';
import {useApi} from '@/hooks/queries/useApi';
import {Typography} from '@mui/material';
import CreateModal from '@/components/CreateModal';
import LoadingSpinner from '@/components/common/loadingSpinner';

/**
 * Infinite scroll (soon) feed for the applications
 * @return {React.Component}
 */
export default function InterviewsFeed() {
  // eslint-disable-next-line no-unused-vars
  const [data, isLoading, error, setError, getInterviews] = useApi('GET', 'interviews?expand=true');

  useEffect(() => {
    getInterviews();
  }, []);

  function renderNoInterviews() {
    return (
      <div className='flex justify-center items-center w-full h-full'>

        <div className='w-96'>
          <Typography variant='h5' className='font-bold text-center'>No interviews found!</Typography>
          <div className='flex justify-center pt-4'>
            <CreateModal/>
          </div>
        </div>

      </div>
    );
  };

  return (
    <>
      {isLoading && <LoadingSpinner loading/>}
      {data?.results?.length === 0 && renderNoInterviews()}
      <div className='py-4 px-8'>
        {data?.results?.length > 0 &&
        data.results.map((interview) => (
          <InterviewCard key={interview.iid} data={interview} />
        ))}
      </div>
    </>
  );
}
