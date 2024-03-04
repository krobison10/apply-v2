'use client';

import React from 'react';

import {useEffect, useState} from 'react';
import InterviewCard from './InterviewCard';
import {useApi} from '@/hooks/queries/useApi';
import {CircularProgress, Typography} from '@mui/material';
import CreateModalButton from '@/components/CreateModalButton';
import useInterviewsFeedURL from '@/hooks/queries/useInterviewsFeedURL';
import InterviewsFeedParams from '@/components/interviews_feed/InterviewsFeedParams';
import InfiniteScroll from 'react-infinite-scroll-component';

const defaultSearchParams = {
  priority_filters: [],
  status_filters: [],
  from_days_ago: null,
  to_days_ago: null,
  sort: 'date',
  order: 'desc',
};

const defaultLimit = 15;

/**
 * Infinite scroll feed for the interviews
 * @return {React.Component}
 */
export default function InterviewsFeed() {
  const savedSearchParams = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('interviewsFeedParams')) : null;
  const [searchParams, setSearchParams] = useState(savedSearchParams || {...defaultSearchParams});
  const defaultNextUrl = useInterviewsFeedURL(searchParams, defaultLimit, 0);
  const [nextUrl, setNextUrl] = useState(defaultNextUrl);
  const [allInterviews, setAllInterviews] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [data, isLoading, error, setError, getInterviews] = useApi('GET');

  useEffect(() => {
    if (data?.results) {
      setAllInterviews((prev) => [...prev, ...data.results]);
      setNextUrl(data.metadata.links.next?.split('/').at(-1));
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem('interviewsFeedParams', JSON.stringify(searchParams));
    if (searchParams) {
      setAllInterviews([]);
      setNextUrl(defaultNextUrl);
      getInterviews(undefined, defaultNextUrl);
    }
  }, [searchParams]);

  function fetchInterviews() {
    if (!isLoading) {
      getInterviews(undefined, nextUrl);
    }
  }

  // Handler for the clear filters button
  function clearParams() {
    setSearchParams({...defaultSearchParams});
  }

  const showNoInterviews = !nextUrl && !allInterviews.length && !isLoading;

  function renderNoInterviews() {
    return (
      <div className='flex justify-center items-center w-full mt-[360px]'>
        <div className='w-96'>
          <Typography variant='h5' className='font-bold text-center'>No interviews found!</Typography>
          <Typography variant='body1' className='text-center'>Try adjusting your filters or create some more</Typography>
          <div className='flex justify-center pt-4'>
            <CreateModalButton/>
          </div>
        </div>
      </div>
    );
  };

  function renderScrollLoader() {
    return <div className='h-32 flex items-center justify-center'><CircularProgress/></div>;
  }

  function renderScrollEnd() {
    // return (
    //   <div className='w-full h-32 flex items-center'>
    //     <Typography variant='body1' className='text-center font-semibold w-full'>
    //       Nothing to see here, get out and start applying!
    //     </Typography>
    //   </div>
    // );
  }

  function renderList() {
    return (
      <>
        {searchParams && <InterviewsFeedParams params={searchParams} setParams={setSearchParams} clearParams={clearParams}/>}

        <div className='h-10 w-full my-4 flex items-center justify-end'>
          <Typography
            variant='subtitle2'
            className='display-block'>
            {`${data?.metadata.total_results || 0} Interview${data?.metadata.total_results === 1 ? '' : 's'}`}
          </Typography>
        </div>
        {!showNoInterviews && <InfiniteScroll
          dataLength={allInterviews.length}
          next={fetchInterviews}
          hasMore={nextUrl}
          loader={renderScrollLoader()}
          endMessage={renderScrollEnd()}
          scrollableTarget='scroll'
        >
          {allInterviews.map((interview) => (
            <InterviewCard key={interview.iid} data={interview} />
          ))}
        </InfiniteScroll>}
        {showNoInterviews && renderNoInterviews()}
      </>
    );
  };

  return (
    <div className='max-w-[1200px] mx-auto h-full'>
      <div className='p-8'>
        {renderList()}
      </div>
    </div>
  );
}
