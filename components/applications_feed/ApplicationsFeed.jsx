'use client';

import React from 'react';
import PropTypes from 'prop-types';

import {useEffect, useState} from 'react';
import {useApi} from '@/hooks/queries/useApi';
import {CircularProgress, ToggleButton, ToggleButtonGroup, Typography} from '@mui/material';
import CreateModalButton from '@/components/CreateModalButton';
import useApplicationsFeedURL from '@/hooks/queries/useApplicationsFeedURL';
import ApplicationsFeedParams from '@/components/applications_feed/ApplicationsFeedParams';
import InfiniteScroll from 'react-infinite-scroll-component';
import ExpandedApplicationsList from '@/components/applications_feed/ExpandedApplicationsList';
import Image from 'next/image';
import CompactApplicationsList from '@/components/applications_feed/CompactApplicationsList';

const defaultSearchParams = {
  priority_filters: [],
  status_filters: [],
  from_days_ago: null,
  to_days_ago: null,
  show_archived: false,
  sort: 'created_at',
  order: 'desc',
};

const defaultLimit = 15;

/**
 * Infinite scroll feed for the applications
 * @return {React.Component}
 */
export default function ApplicationsFeed({searchTerm}) {
  const savedSearchParams = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('applicationsFeedParams')) : null;
  const [searchParams, setSearchParams] = useState(savedSearchParams || {...defaultSearchParams});
  const defaultNextUrl = useApplicationsFeedURL(searchParams, searchTerm, defaultLimit, 0);
  const [nextUrl, setNextUrl] = useState(defaultNextUrl);
  const [allApplications, setAllApplications] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [data, isLoading, error, setError, getApplications] = useApi('GET');

  const savedUseExpandedView = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('useExpandedApplicationsView')) : false;
  const [useExpandedView, setUseExpandedView] = useState(savedUseExpandedView);


  useEffect(() => {
    if (data?.results) {
      setAllApplications((prev) => [...prev, ...data.results]);
      setNextUrl(data.metadata.links.next?.split('/').at(-1));
    }
  }, [data]);

  useEffect(() => {
    localStorage.setItem('applicationsFeedParams', JSON.stringify(searchParams));
    if (searchParams) {
      setAllApplications([]);
      setNextUrl(defaultNextUrl);
      getApplications(undefined, defaultNextUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    localStorage.setItem('useExpandedApplicationsView', JSON.stringify(useExpandedView));
  }, [useExpandedView]);

  function fetchApplications() {
    if (!isLoading) {
      getApplications(undefined, nextUrl);
    }
  }

  // Handler for the clear filters button
  function clearParams() {
    setSearchParams({...defaultSearchParams});
  }

  const showNoApplications = !nextUrl && !allApplications.length && !isLoading;

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

  function renderScrollLoader() {
    return <div className='h-32 flex items-center justify-center'><CircularProgress/></div>;
  }

  function renderScrollEnd() {
    return (
      <div className='w-full h-32 flex items-center'>
        <Typography variant='body1' className='text-center font-semibold w-full'>
          Nothing to see here, get out and start applying!
        </Typography>
      </div>
    );
  }

  function renderList() {
    return (
      <>
        {searchParams && <ApplicationsFeedParams params={searchParams} setParams={setSearchParams} clearParams={clearParams}/>}

        <div className='h-10 w-full my-4 flex items-center justify-end'>
          <Typography
            variant='subtitle2'
            className='display-block'>
            {`${data?.metadata.total_results || 0} Application${data?.metadata.total_results === 1 ? '' : 's'}`}
          </Typography>
          <ToggleButtonGroup value={useExpandedView ? 'expanded' : 'compact'} size='small' className='ml-4' exclusive>
            <ToggleButton value="expanded" onClick={() => setUseExpandedView(true)}>
              <Image src='/icons/non-compact-icon.svg' alt='compact' width={16} height={16} />
            </ToggleButton>
            <ToggleButton value="compact" onClick={() => setUseExpandedView(false)}>
              <Image src='/icons/compact-icon.svg' alt='compact' width={16} height={16} />
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        {!showNoApplications && <InfiniteScroll
          dataLength={allApplications.length}
          next={fetchApplications}
          hasMore={nextUrl}
          loader={renderScrollLoader()}
          endMessage={renderScrollEnd()}
          scrollableTarget='scroll'
        >
          {useExpandedView ?
            <ExpandedApplicationsList applications={allApplications}/> :
            <CompactApplicationsList applications={allApplications}/>}
        </InfiniteScroll>}
        {showNoApplications && renderNoApplications()}
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

ApplicationsFeed.propTypes = {
  searchTerm: PropTypes.string,
};
