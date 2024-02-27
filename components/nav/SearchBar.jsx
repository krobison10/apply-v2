import {CircularProgress, IconButton, InputBase} from '@mui/material';
import React, {useEffect, useRef} from 'react';
import {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {ClearIcon} from '@mui/x-date-pickers';
import SearchAutocomplete from '@/components/nav/SearchAutocomplete';
import useSearchParam from '@/hooks/useSearchParam';

export default function SearchBar() {
  const initialSearch = useSearchParam();
  const [hasFocus, setHasFocus] = useState(false);
  const [search, setSearch] = useState(initialSearch);
  const [isCursorOverAutoComplete, setIsCursorOverAutoComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const focusRef = useRef(null);

  useEffect(() => {
    if (document.activeElement === focusRef.current) {
      setHasFocus(true);
    }
  }, [hasFocus]);

  useEffect(() => {
    setSearch(initialSearch);
  }, [initialSearch]);


  const outerClasses =
  hasFocus || search ?
  'bg-white' :
  'bg-gray-300 shadow-md';

  const showAutocomplete = hasFocus && search.length > 0;

  function updateSearch(newSearch) {
    setSearch(newSearch);
  }

  function handleBlur() {
    if (!isCursorOverAutoComplete) {
      setHasFocus(false);
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      window.location.href = `/search?search=${search}`;
    }
  }

  function renderStartAdornment() {
    return (
      <div className='flex items-center'>
        {isLoading ?
        <div className='flex items-center justify-center w-6 h-6'><CircularProgress size={20} /></div> :
        <SearchIcon className='text-text-primary'/>}
      </div>
    );
  }

  function renderEndAdornment() {
    if (search.length > 0) {
      return (
        <IconButton
          aria-label="clear search"
          size='small'
          onClick={() => {
            setSearch('');
            document.getElementById('search-bar-input').focus();
          }}
        >
          <ClearIcon fontSize='inherit'/>
        </IconButton>
      );
    }
  }

  return (
    <div className={`${outerClasses} w-[460px] rounded-md border-4 border-secondary`}>
      <InputBase
        id='search-bar-input'
        className='py-[4px] px-[8px] w-full h-full'
        placeholder='Search applications'
        startAdornment={renderStartAdornment()}
        endAdornment={renderEndAdornment()}
        onBlur={() => handleBlur()}
        onFocus={() => setHasFocus(true)}
        value={search}
        onChange={(e) => updateSearch(e.target.value)}
        slotProps={{input: {className: 'ml-1'}}}
        spellCheck={false}
        onKeyDown={handleKeyPress}
        ref={focusRef}
      />
      {showAutocomplete && <SearchAutocomplete
        search={search}
        setCursorOver={setIsCursorOverAutoComplete}
        pxWidth={460}
        setIsLoading={setIsLoading}
      />}
    </div>
  );
}
