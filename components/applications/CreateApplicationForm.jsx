'use client';
import React, {useState} from 'react';
import {Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField} from '@mui/material';

import SelectInput from '@/components/common/form/SelectInput';

export default function CreateApplicationForm() {
  const [formValues, setFormValues] = useState({
    status: 'Not Submitted',
    title: '',
    description: '',
    field: '',
    position: '',
    wage: '',
    company: '',
    industry: '',
    website: '',
    phone: '',
  });

  const handleChange = (e) => {
    const {id, value} = e.target;
    // Using id as the key to update the corresponding value in the state
    setFormValues((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  function submitForm(e) {
    e.preventDefault();
    console.log(formValues);
  }

  return (
    <div className='pt-2'>
      <div>
        <TextField
          id="job-title-input"
          label="Position"
          variant="outlined"
          className='w-96'
          value={formValues.title || ''}
          onChange={handleChange} />

        <TextField
          id="company-input"
          label="Company"
          variant="outlined"
          className='w-96 mt-4'
          value={formValues.company || ''}
          onChange={handleChange} />

        <SelectInput
          className='w-40 mt-4'
          name='status'
          label="Status"
          options={['Not Submitted', 'Submitted', 'Ignored', 'Responded', 'Interviewing', 'Offered', 'Rejected', 'Accepted']}
          value={formValues.status || ''}
          onChange={handleChange}
        />

        <TextField
          id="description-input"
          label="Description"
          placeholder="Description"
          multiline
          className='w-full mt-4'
          value={formValues.description || ''}
          onChange={handleChange}
        />

        <TextField
          id="field-input"
          label="Field"
          variant="outlined"
          className='w-96 mt-4'
          value={formValues.field || ''}
          onChange={handleChange}/>

        <TextField
          id="level-input"
          label="Level"
          variant="outlined"
          className='w-96 mt-4'
          value={formValues.field}
          onChange={handleChange || ''}/>

        <div>
          <FormControl fullWidth className='mt-4 w-40'>
            <InputLabel htmlFor="wage-input">Wage</InputLabel>
            <OutlinedInput
              id="wage-input"
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
              label="Wage"
              type='number'
              value={formValues.wage || 0}
              onChange={handleChange}
            />
          </FormControl>
        </div>

        <TextField
          id="industry-input"
          label="Industry"
          variant="outlined"
          className='w-96 mt-4'
          value={formValues.industry || ''}
          onChange={handleChange} />

        <TextField
          id="company-website-input"
          label="Company website"
          variant="outlined"
          className='w-96 mt-4'
          value={formValues.website || ''}
          onChange={handleChange} />

        <TextField
          id="company-phone-input"
          label="Company phone"
          variant="outlined"
          className='w-96 mt-4'
          value={formValues.phone || ''}
          onChange={handleChange}/>

      </div>

      <div className='flex mt-8 mb-6'>
        <Button
          onClick={submitForm}
          variant='contained'
          color='success'
          className='mx-auto'>
            Create Application
        </Button>
      </div>
    </div>
  );
}
