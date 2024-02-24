import {IconButton, InputBase} from '@mui/material';
import React from 'react';
import {useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {ClearIcon} from '@mui/x-date-pickers';

export default function SearchBar() {
  const [hasFocus, setHasFocus] = useState(false);
  const [search, setSearch] = useState('');

  const outerClasses =
  hasFocus ?
  'bg-white' :
  'bg-gray-200 shadow-md';

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
        placeholder='Search'
        startAdornment={<SearchIcon className='text-text-primary'/>}
        endAdornment={renderEndAdornment()}
        onBlur={() => setHasFocus(false)}
        onFocus={() => setHasFocus(true)}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        slotProps={{input: {className: 'ml-1'}}}
      />
    </div>
  );
}
