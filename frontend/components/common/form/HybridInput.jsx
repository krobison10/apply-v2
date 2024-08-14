import React from 'react';
import PropTypes from 'prop-types';
import {OutlinedInput, Typography} from '@mui/material';


export default function SettingsInput({label, className, containerStyle, onChange, edit, ...remainingProps}) {
  const extraClass = edit ? '' : 'bg-gray-100 border-none outline-none';

  const border = !edit ? 'none' : '';
  const sx = {
    '& .MuiOutlinedInput-notchedOutline': {
      border,
    },
  };

  function handleChange(event) {
    onChange(event);
  }

  return (
    <div className={containerStyle}>
      <div className='w-full'>
        <Typography variant='caption' className='font-medium'>{label}</Typography>
      </div>
      <OutlinedInput
        sx={sx}
        {...remainingProps}
        size='small'
        onChange={handleChange}
        className={`${className} ${extraClass} w-full`}
      />

    </div>
  );
}

SettingsInput.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  containerStyle: PropTypes.string,
  onChange: PropTypes.func,
  edit: PropTypes.bool,
};
