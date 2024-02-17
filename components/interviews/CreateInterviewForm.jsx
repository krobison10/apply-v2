'use client';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Autocomplete, Button, CircularProgress, TextField} from '@mui/material';
import {useApi} from '@/hooks/queries/useApi';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';

import SelectInput from '@/components/common/form/SelectInput';

function SelectApplicationDropdown({onChange}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const [data, isLoading, error, setError, getApplications] = useApi('GET', 'applications?expand=true');

  useEffect(() => {
    getApplications();
  }, []);

  useEffect(() => {
    if (data) {
      setOptions(data.results);
    }
  }, [data]);

  function applicationText(option) {
    return `${option.position_title} - ${option.company_name}`;
  }

  return (
    <Autocomplete
      id="application-select"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => applicationText(option)}
      options={options}
      loading={isLoading}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Application"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}

SelectApplicationDropdown.propTypes = {
  onChange: PropTypes.func,
};


// See: https://www.freecodecamp.org/news/how-to-build-forms-in-react/
export default function CreateInterviewForm({closeModal}) {
  const [formValues, setFormValues] = useState({
    aid: 0,
    date: null,
    type: '',
    modality: 'In person',
    location: '',
    notes: '',
  });

  // eslint-disable-next-line no-unused-vars
  const [createResponse, isLoading, error, clearError, createInterview] = useApi('POST', 'interviews');

  if (createResponse) {
    closeModal();
    window.location.reload();
  }


  function handleChange(event, field) {
    setFormValues({...formValues, [field]: event.target.value});
  }

  function handleApplicationSelect(event, application) {
    // console.log(application);
    setFormValues({...formValues, aid: application?.aid});
  }

  function handleTimeSelect(newValue, field) {
    setFormValues({...formValues, [field]: newValue});
  }

  function submitForm(e) {
    e.preventDefault();
    const data = {...formValues};
    data.date = data.date?.toISOString();
    console.log(data);
    createInterview(data);
    console.log(data);
  }

  return (
    <div className='pt-2 w-full'>
      <div>
        <SelectApplicationDropdown onChange={(event, newValue) => handleApplicationSelect(event, newValue)}/>

        <DateTimePicker
          value={formValues.date}
          onChange={(newValue) => handleTimeSelect(newValue, 'date')}
          label="Time"
          className='w-54 mt-6'/>

        <TextField
          id="type-input"
          label="Type"
          variant="outlined"
          className='w-full mt-6'
          value={formValues.type}
          onChange={(event) => handleChange(event, 'type')} />

        <SelectInput
          className='w-40 mt-6'
          name="modality"
          label="Modality"
          defaultValue="In person"
          options={['In person', 'Remote', 'One-way']}
          value={formValues.modality}
          onChange={(event) => handleChange(event, 'modality')} />

        <TextField
          id="location-input"
          label="Location"
          className='w-full mt-6'
          value={formValues.location}
          onChange={(event) => handleChange(event, 'location')} />

        <TextField
          id="notes-input"
          label="Notes"
          variant="outlined"
          multiline
          className='w-full mt-6'
          value={formValues.notes}
          onChange={(event) => handleChange(event, 'notes')}/>

      </div>

      <div className='flex mt-8 mb-6'>
        <Button
          onClick={submitForm}
          variant='contained'
          color='success'
          className='mx-auto'
          size='large'
          // disabled={isLoading}
        >
            Create interview
        </Button>
      </div>
    </div>
  );
}

CreateInterviewForm.propTypes = {
  closeModal: PropTypes.func,
};
