'use client';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, TextField} from '@mui/material';
import {useApi} from '@/hooks/queries/useApi';
import useAlert from '@/hooks/useAlert';

import SelectInput from '@/components/common/form/SelectInput';

// See: https://www.freecodecamp.org/news/how-to-build-forms-in-react/
export default function CreateApplicationForm({closeModal}) {
  const [formValues, setFormValues] = useState({
    title: '',
    company: '',
    status: 'Not Submitted',
    description: '',
  });

  const alert = useAlert();

  // eslint-disable-next-line no-unused-vars
  const [response, isLoading, error, clearError, createApplication] = useApi('POST', '/applications');

  if (response) {
    closeModal();
    alert.success('Application created successfully');
    window.location.reload();
  }


  function handleChange(event, field) {
    setFormValues({...formValues, [field]: event.target.value});
  }

  function submitForm(e) {
    e.preventDefault();
    const data = {...formValues};
    data.status = data.status.toLowerCase();
    createApplication(data);
  }

  return (
    <div className='pt-2 w-full'>
      <div>
        <TextField
          id="job-title-input"
          label="Position"
          variant="outlined"
          className='w-full'
          value={formValues.title || ''}
          onChange={(event) => handleChange(event, 'title')} />

        <TextField
          id="company-input"
          label="Company"
          variant="outlined"
          className='w-full mt-6'
          value={formValues.company || ''}
          onChange={(event) => handleChange(event, 'company')} />

        <SelectInput
          className='w-40 mt-8'
          name='status'
          label="Status"
          defaultValue='Not Submitted'
          options={['Not Submitted', 'Submitted', 'Ignored', 'Responded', 'Interviewing', 'Offered', 'Rejected', 'Accepted']}
          value={formValues.status || ''}
          onChange={(event) => handleChange(event, 'status')} />

        <TextField
          id="description-input"
          label="Description"
          multiline
          className='w-full mt-8'
          value={formValues.description || ''}
          onChange={(event) => handleChange(event, 'description')} />

        {/* <TextField
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
          onChange={handleChange}/> */}

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
            Create Application
        </Button>
      </div>
    </div>
  );
}

CreateApplicationForm.propTypes = {
  closeModal: PropTypes.func,
};
