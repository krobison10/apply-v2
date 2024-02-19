'use client';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Autocomplete, Button, CircularProgress, TextField} from '@mui/material';
import {useApi} from '@/hooks/queries/useApi';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

import SelectInput from '@/components/common/form/SelectInput';

function SelectApplicationDropdown({aid, onChange}) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);


  // eslint-disable-next-line no-unused-vars
  const [data, isLoading, error, setError, getApplications] = useApi('GET', 'applications?expand=true');

  useEffect(() => {
    getApplications();
  }, []);

  useEffect(() => {
    if (data) {
      setOptions(data.results);
      // Preselect the option based on aid
      if (aid) {
        const preselectedOption = data.results.find((option) => option.aid === aid);
        setSelectedOption(preselectedOption || null);
      }
    }
  }, [data]);

  function onSelect(event, newValue) {
    onChange(event, newValue);
    setSelectedOption(newValue);
  }

  function applicationText(option) {
    return `${option.position_title} - ${option.company_name}`;
  }

  return (
    <Autocomplete
      id="application-select"
      className='mt-3'
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => applicationText(option)}
      options={options}
      loading={isLoading}
      value={selectedOption}
      onChange={onSelect}
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
  edit: PropTypes.bool,
  aid: PropTypes.number,
  onChange: PropTypes.func,
};

function toUpperCase(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// See: https://www.freecodecamp.org/news/how-to-build-forms-in-react/
export default function InterviewForm({data, edit, closeModal}) {
  const [formValues, setFormValues] = useState({
    aid: 0,
    date: null,
    type: '',
    modality: 'In person',
    location: '',
    notes: '',
  });

  useEffect(() => {
    if (data) {
      setFormValues({
        aid: data?.aid || 0,
        date: data?.date || null,
        type: data?.type || '',
        modality: toUpperCase(data?.modality) || 'In person',
        location: data?.location || '',
        notes: data?.notes || '',
      });
    }
  }, [data]);

  // eslint-disable-next-line no-unused-vars
  const [createResponse, isLoading, error, clearError, createInterview] = useApi(edit ? 'PUT' : 'POST', `interviews${edit ? `?iid=${data?.iid}` : ''}`);

  if (createResponse) {
    closeModal();
    window.location.href = '/interviews';
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
    console.log(formValues);
    const data = {...formValues};
    console.log(data);
    createInterview(data);
  }

  return (
    <div className='pt-2 w-[600px]'>
      <div>
        <SelectApplicationDropdown aid={formValues.aid} edit={edit} onChange={(event, newValue) => handleApplicationSelect(event, newValue)}/>

        <DateTimePicker
          value={formValues.date ? dayjs(formValues.date) : null}
          onChange={(newValue) => handleTimeSelect(newValue, 'date')}
          label="Time"
          className='w-64 mt-6'/>

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
          {edit ? 'Submit' : 'Create interview'}
        </Button>
      </div>
    </div>
  );
}

InterviewForm.propTypes = {
  data: PropTypes.object,
  edit: PropTypes.bool,
  closeModal: PropTypes.func,
};
