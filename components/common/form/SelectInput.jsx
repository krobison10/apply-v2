'use client';

import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';

function SelectInput({className, value, name, label, options, onChange}) {
  const [formValue, setValue] = useState(value);

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event);
  };

  return (
    <div className={className}>
      <FormControl fullWidth>

        <InputLabel id={`${name}-select-label`}>Status</InputLabel>
        <Select
          labelId={`${name}-select-label`}
          id={`${name}-select`}
          value={formValue}
          label={label}
          className='w-full'
          onChange={handleChange}
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
