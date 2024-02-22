'use client';

import React from 'react';
import PropTypes from 'prop-types';

import {Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select} from '@mui/material';
import {DateRangePicker} from '@mui/x-date-pickers-pro/DateRangePicker';
import {capitalizeFirstLetter} from '@/utils/helpers';
import dayjs from 'dayjs';


const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 500,
      width: 192,
    },
  },
};

const statuses = [
  'not_submitted',
  'submitted',
  'responded',
  'rejected',
  'interviewing',
  'offer_received',
  'withdrawn',
  'closed',
];

const dateRangeShortcuts = [
  {
    label: 'Last 3 Days',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(3, 'day'), today];
    },
  },
  {
    label: 'This Week',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('week'), today.endOf('week')];
    },
  },
  {
    label: 'Last 7 Days',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(7, 'day'), today];
    },
  },
  {
    label: 'This Month',
    getValue: () => {
      const today = dayjs();
      return [today.startOf('month'), today.endOf('month')];
    },
  },
  {
    label: 'Last 90 Days',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(90, 'day'), today];
    },
  },
  {
    label: 'Last Year',
    getValue: () => {
      const today = dayjs();
      return [today.subtract(365, 'day'), today];
    },
  },
  {label: 'Reset', getValue: () => [null, null]},
];


export default function InterviewsFeedParams({params, setParams, clearParams}) {
  function handleStatusSelect(event) {
    const {
      target: {value},
    } = event;
    const newStatuses = typeof value === 'string' ? value.split(',') : value;
    setParams((prevParams) => ({
      ...prevParams,
      status_filters: newStatuses,
    }));
  }

  function handleDateSelect([fromDate, toDate]) {
    const startOfDay = dayjs().startOf('day');

    setParams((prevParams) => ({
      ...prevParams,
      from_days_ago: fromDate ? startOfDay.diff(fromDate.startOf('day'), 'day') : null,
      to_days_ago: toDate ? startOfDay.diff(toDate.startOf('day'), 'day') : null,
    }));
  }

  const fromDate = params.from_days_ago || params.from_days_ago === 0 ? dayjs(dayjs().subtract(params.from_days_ago, 'day')) : null;
  const toDate = params.to_days_ago || params.to_days_ago === 0 ? dayjs(dayjs().subtract(params.to_days_ago, 'day')) : null;
  const dateRange = [fromDate, toDate];


  return (
    <div className='w-full flex gap-4 flex-wrap mb-4 m-auto'>
      {/* Status Select */}
      <div>
        <FormControl className='w-48'>
          <InputLabel id="select-app-status-label" size='small'>Status</InputLabel>
          <Select
            labelId="select-app-status-label"
            id="select-app-status"
            multiple
            value={params.status_filters}
            onChange={handleStatusSelect}
            input={<OutlinedInput label="Status" />}
            renderValue={(selected) => selected ? selected.map((e) => capitalizeFirstLetter(e).replace('_', ' ')).join(', ') : 'Any'}
            MenuProps={MenuProps}
            size='small'
          >
            {statuses.map((name) => (
              <MenuItem key={name} value={name} className='h-9 pl-[7px]'>
                <Checkbox checked={params.status_filters.indexOf(name) > -1} />
                <ListItemText primary={capitalizeFirstLetter(name).replace('_', ' ')} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>


      {/* Sort Select */}
      <div>
        <FormControl className='w-48'>
          <InputLabel id="select-sort-label" size='small'>Sort</InputLabel>
          <Select
            labelId="select-sort-label"
            id="select-sort"
            value={params.sort}
            onChange={(event) => setParams((prevParams) => ({...prevParams, sort: event.target.value}))}
            label="Sort"
            size='small'
          >
            <MenuItem value={'created_at'}>Created at</MenuItem>
            <MenuItem value={'updated_at'}>Edited at</MenuItem>
            <MenuItem value={'date'}>Time</MenuItem>
            <MenuItem value={'company_name'}>Company name</MenuItem>
            <MenuItem value={'position_title'}>Job title</MenuItem>
            <MenuItem value={'position_wage'}>Pay</MenuItem>
            <MenuItem value={'priority'}>Priority</MenuItem>
          </Select>
        </FormControl>
      </div>


      {/* Order Select */}
      <div>
        <FormControl className='w-36'>
          <InputLabel id="select-order-label" size='small'>Order</InputLabel>
          <Select
            labelId="select-order-label"
            id="select-order"
            value={params.order}
            onChange={(event) => setParams((prevParams) => ({...prevParams, order: event.target.value}))}
            label="Order"
            size='small'
          >
            <MenuItem value={'desc'}>Descending</MenuItem>
            <MenuItem value={'asc'}>Ascending</MenuItem>
          </Select>
        </FormControl>
      </div>


      <div className='w-[300px]'>
        <DateRangePicker
          localeText={{start: 'From', end: 'To'}}
          slotProps={{textField: {size: 'small', className: 'mx-0'}, fieldSeparator: {className: 'mx-0 px-[2.75px]'}, shortcuts: {
            items: dateRangeShortcuts,
          }}}
          calendars={1}
          className='w-full'
          closeOnSelect={false}
          value={dateRange}
          onChange={(newDateRange) => handleDateSelect(newDateRange)}
        />
      </div>

      <div className='w-42'>
        <Button
          variant='outlined'
          color='primary'
          className='h-10'
          size='medium'
          onClick={() => clearParams()}
        >
        Clear filters
        </Button>
      </div>


    </div>
  );
}

InterviewsFeedParams.propTypes = {
  params: PropTypes.object.isRequired,
  setParams: PropTypes.func.isRequired,
  clearParams: PropTypes.func.isRequired,
};
