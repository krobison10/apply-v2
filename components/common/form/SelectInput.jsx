'use client';

import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function SelectInput({className, value, name, options, onChange, ...props}) {
  return (
    <div className={className}>
      <FormControl fullWidth>

        <InputLabel id={`${name}-select-label`}>{props.label}</InputLabel>
        <Select
          labelId={`${name}-select-label`}
          id={`${name}-select`}
          value={value}
          className='w-full'
          onChange={onChange}
          {...props}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>{option}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

SelectInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
};

export default SelectInput;
