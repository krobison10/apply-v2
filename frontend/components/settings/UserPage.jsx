'use client';

import React, {useEffect} from 'react';
import LoadingSpinner from '@/components/common/loadingSpinner';
import {Button, Typography} from '@mui/material';
import {useApi} from '@/hooks/queries/useApi';
import UserForm from '@/components/settings/UserForm';

export default function UserPage() {
  // eslint-disable-next-line no-unused-vars
  const [userData, isLoading, userFetchError, clearUserFetchError, getUser] = useApi('GET', 'user');

  useEffect(() => {
    getUser();
  }, []);

  function callRetry() {
    clearUserFetchError();
    getUser();
  }

  function renderTryAgain() {
    return (
      <div className='flex justify-center items-center w-full h-full'>
        <div className='w-96'>
          <Typography variant='h5' className='font-bold text-center'>Something went wrong</Typography>
          <div className='flex justify-center pt-4'>
            <Button variant='contained' color='primary' onClick={callRetry}>Try again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full h-full rounded-md bg-white shadow-sm mt-6'>
      {isLoading && <LoadingSpinner loading/>}
      {userData && <UserForm userData={userData}/>}
      {userFetchError && renderTryAgain()}
    </div>
  );
}
