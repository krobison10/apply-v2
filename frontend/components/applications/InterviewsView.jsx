import {Button, Typography} from '@mui/material';
import React from 'react';
import {useEffect} from 'react';
import {useApi} from '@/hooks/queries/useApi';
import LoadingSpinner from '@/components/common/loadingSpinner';
import InterviewCard from '@/components/interviews_feed/InterviewCard';
import PropTypes from 'prop-types';


export default function InterviewsView({aid}) {
  // eslint-disable-next-line no-unused-vars
  const [interviewsData, interviewsLoading, interviewsFetchError, clearInterviewsFetchError, getInterviews] = useApi('GET', `interviews?aid=${aid}`);

  useEffect(() => {
    if (aid && !interviewsData) {
      getInterviews();
    }
  }, [aid]);

  console.log(interviewsData);

  function callRetry() {
    clearInterviewsFetchError();
    getInterviews();
  }

  function renderTryAgain() {
    return (
      <div className='flex justify-center items-center w-full h-[200px]'>
        <div className='w-96'>
          <Typography variant='h5' className='text-center'>Failed to fetch interviews</Typography>
          <div className='flex justify-center pt-4'>
            <Button variant='contained' color='primary' onClick={callRetry}>Try again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full mt-6'>
      {interviewsLoading && <LoadingSpinner containerHeight='h-[200px]' loading/>}
      {interviewsData?.results?.length > 0 &&
        interviewsData.results.map((interview) => {
          return <InterviewCard key={interview.iid} data={interview} />;
        })
      }
      {interviewsData?.results?.length === 0 && !interviewsLoading && !interviewsFetchError &&
        <div className='flex justify-center items-center w-full h-[200px]'>
          <Typography variant='h5'>No interviews found</Typography>
        </div>
      }
      {interviewsFetchError && renderTryAgain()}
    </div>
  );
}

InterviewsView.propTypes = {
  aid: PropTypes.number,
};

