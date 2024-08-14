'use client';

import React from 'react';
import PropTypes from 'prop-types';
import {Typography} from '@mui/material';


export default function PlaceholderInput({label, value, className, multiline, ...props}) {
  const height = multiline ? 'min-h-10' : 'h-10';
  return (
    <div className={className}>
      {label && <div className='w-full'>
        <Typography variant='caption' className='font-medium'>{label}</Typography>
      </div>}
      <div className={`w-full bg-gray-100 rounded-[4px] py-2 px-[14px] cursor-text ${height}`} {...props}>
        <Typography variant='body1'>{value}</Typography>
      </div>
    </div>
  );
}

PlaceholderInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  className: PropTypes.string,
  onMouseDown: PropTypes.func,
  multiline: PropTypes.bool,
};
