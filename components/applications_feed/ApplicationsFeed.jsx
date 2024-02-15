'use client';

import React from 'react';

import {useEffect} from 'react';
import ApplicationCard from './ApplicationCard';
import {useApi} from '@/hooks/queries/useApi';

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

  return (
    <div className='py-4 px-8'>
      {isLoading && <h1>Loading...</h1>}
      {data && data.results &&
        data.results.map((application) => (
          <ApplicationCard key={application.id} data={application} />
        ))}
    </div>
  );
}
