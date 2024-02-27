import {Divider, Typography} from '@mui/material';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useApi} from '@/hooks/queries/useApi';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';


export default function SearchAutocomplete({search, pxWidth, setCursorOver, setIsLoading}) {
  // eslint-disable-next-line no-unused-vars
  const [data, isLoading, error, setError, getApplications] = useApi('GET', `applications?search=${search}&sort=relevance&limit=5`);

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (search) {
      getApplications();
    }
  }, [search]);

  return (
    <div
      id="search-autocomplete-container"
      className={`absolute top-[53px] z-[100] w-[${pxWidth}px] py-2 bg-white rounded-[5px] shadow-lg`}
      onMouseEnter={() => setCursorOver(true)}
      onMouseLeave={() => setCursorOver(false)}
    >
      {error && <div className='w-full h-full flex justify-center items-center'><Typography variant='body1'>Something went wrong</Typography></div>}
      {data?.results?.length > 0 &&
        <>
          {data.results.map((application) => <SearchAutocompleteResult key={application.aid} data={application} />)}
          <Divider/>
        </>}
      <div
        className='flex items-center justify-between py-2 px-1 cursor-pointer hover:bg-gray-100 active:bg-gray-200 select-none'
        onClick={() => window.location.href = `/search?search=${search}`}
      >
        <div className='flex items-center'>
          <SearchIcon className='ml-2' />
          <Typography variant='body1' className='ml-2'>See all results for &quot;<span className='font-semibold'>{search}</span>&quot;</Typography>

        </div>

        <div className='flex items-center mr-4'>
          <Typography variant='caption' className='ml-2 justify-self-end'>Press</Typography>
          <div className='inline-block ml-2'>
            <div className='bg-gray-200 w-8 h-5 p-[2px] rounded-[4px] flex items-center justify-center'>
              <KeyboardReturnIcon className='h-full w-full' />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

SearchAutocomplete.propTypes = {
  search: PropTypes.string.isRequired,
  pxWidth: PropTypes.number.isRequired,
  setCursorOver: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};

function SearchAutocompleteResult({data}) {
  return (
    <div
      className='flex items-center py-2 px-1 cursor-pointer hover:bg-gray-100 active:bg-gray-200 select-none'
      onClick={() => window.location.href = `/application?aid=${data.aid}`}
    >
      <Typography variant='body1' className='ml-2 line-clamp-1'>{data.company_name} | {data.position_title}</Typography>
    </div>
  );
}

SearchAutocompleteResult.propTypes = {
  data: PropTypes.object.isRequired,
};
