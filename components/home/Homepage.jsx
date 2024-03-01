'use client';
import {Typography} from '@mui/material';
import React, {useEffect} from 'react';
import {useState} from 'react';
import UserContext from '@/context/userContext';
import {useContext} from 'react';
import {useApi} from '@/hooks/queries/useApi';

export default function Homepage() {
  const {user} = useContext(UserContext);

  const [applicationsCount, setApplicationsCount] = useState(0);
  const [unsubmittedApplicationsCount, setUnsubmittedApplicationsCount] = useState(0);
  const [respondedApplicationsCount, setRespondedApplicationsCount] = useState(0);

  const [
    applicationsCountResponse, // eslint-disable-line no-unused-vars
    applicationsCountIsLoading, // eslint-disable-line no-unused-vars
    getApplicationsCountError, // eslint-disable-line no-unused-vars
    clearApplicationsCountError, // eslint-disable-line no-unused-vars
    getApplicationsCount, // eslint-disable-line no-unused-vars
  ] = useApi('GET', 'applications?limit=0');

  const [
    unsubmittedApplicationsCountResponse, // eslint-disable-line no-unused-vars
    unsubmittedApplicationsCountIsLoading, // eslint-disable-line no-unused-vars
    getUnsubmittedApplicationsCountError, // eslint-disable-line no-unused-vars
    clearUnsubmittedApplicationsCountError, // eslint-disable-line no-unused-vars
    getUnsubmittedApplicationsCount, // eslint-disable-line no-unused-vars
  ] = useApi('GET', 'applications?limit=1&status_filters=not_submitted');

  const [
    respondedApplicationsCountResponse, // eslint-disable-line no-unused-vars
    respondedApplicationsCountIsLoading, // eslint-disable-line no-unused-vars
    getRespondedApplicationsCountError, // eslint-disable-line no-unused-vars
    clearRespondedApplicationsCountError, // eslint-disable-line no-unused-vars
    getRespondedApplicationsCount, // eslint-disable-line no-unused-vars
  ] = useApi('GET', `applications?limit=0&status_filters=responded&status_filters=interviewing&status_filters=offer_received`);

  useEffect(() => {
    getApplicationsCount();
    getUnsubmittedApplicationsCount();
    getRespondedApplicationsCount();
  }, []);

  useEffect(() => {
    if (applicationsCountResponse) {
      setApplicationsCount(applicationsCountResponse?.metadata?.total_results || 0);
    }
  }, [applicationsCountResponse]);

  useEffect(() => {
    if (unsubmittedApplicationsCountResponse) {
      setUnsubmittedApplicationsCount(unsubmittedApplicationsCountResponse?.metadata?.total_results || 0);
    }
  }, [unsubmittedApplicationsCountResponse]);

  useEffect(() => {
    if (respondedApplicationsCountResponse) {
      setRespondedApplicationsCount(respondedApplicationsCountResponse?.metadata?.total_results || 0);
    }
  }, [respondedApplicationsCountResponse]);


  return (
    <>{user && <div className='h-full w-1200 p-8'>
      <Typography variant='h3' className='animate-fadeUp'>Hi{user?.firstname && `, ${user.firstname}`} </Typography>
      <Typography variant='h5' className='animate-fadeUp mt-1'>Here is your overview for this season:</Typography>

      <Typography variant='h5' className='animate-fadeUp mt-4'>{applicationsCount} applications created</Typography>
      <Typography variant='h5' className='animate-fadeUp mt-4'>{unsubmittedApplicationsCount} unsubmitted applications</Typography>
      <Typography variant='h5' className='animate-fadeUp mt-4'>{respondedApplicationsCount} responses</Typography>
      <Typography variant='body1' className='animate-fadeUp'>{Math.round(respondedApplicationsCount/applicationsCount * 100) || 0}% response rate</Typography>

    </div>}
    </>
  );
}
