'use client';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField} from '@mui/material';
import {useApi} from '@/hooks/queries/useApi';

import SelectInput from '@/components/common/form/SelectInput';

// See: https://www.freecodecamp.org/news/how-to-build-forms-in-react/
export default function CreateApplicationForm({closeModal}) {
  const [formValues, setFormValues] = useState({
    position_title: '',
    company_name: '',
    status: 'Not Submitted',
    notes: '',
    posting_url: '',

    priority: 0,
    application_date: undefined,
    position_level: '',
    position_wage: null,
    company_industry: '',
    company_website: '',
    job_location: '',
    posting_source: '',
    job_start: undefined,
  });

  const extraFieldPopulated = formValues.application_date || formValues.position_level ||
  formValues.position_wage || formValues.company_industry || formValues.company_website ||
  formValues.job_location || formValues.posting_source || formValues.priority ||
  formValues.job_start;

  // eslint-disable-next-line no-unused-vars
  const [response, isLoading, error, clearError, createApplication] = useApi('POST', 'applications');

  const [showExtraFields, setShowExtraFields] = useState(false);

  if (response) {
    closeModal();
    window.location.reload();
  }


  function handleChange(event, field) {
    setFormValues({...formValues, [field]: event.target.value});
  }

  function submitForm(e) {
    e.preventDefault();
    const data = {...formValues};
    data.status = data.status.toLowerCase();
    data.position_wage = Number.parseFloat(data.position_wage || 0);
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
          value={formValues.position_title}
          onChange={(event) => handleChange(event, 'position_title')} />

        <TextField
          id="company-input"
          label="Company"
          variant="outlined"
          className='w-full mt-6'
          value={formValues.company_name}
          onChange={(event) => handleChange(event, 'company_name')} />

        <SelectInput
          className='w-40 mt-6'
          name='status'
          label="Status"
          defaultValue='Not Submitted'
          options={['Not Submitted', 'Submitted', 'Responded', 'Rejected', 'Interviewing', 'Offer received', 'Withdrawn', 'Closed']}
          value={formValues.status}
          onChange={(event) => handleChange(event, 'status')} />

        <TextField
          id="description-input"
          label="Description"
          multiline
          className='w-full mt-6'
          value={formValues.notes}
          onChange={(event) => handleChange(event, 'notes')} />

        <TextField
          id="posting-url-input"
          label="Posting Link"
          variant="outlined"
          className='w-full mt-6'
          value={formValues.posting_url}
          onChange={(event) => handleChange(event, 'posting_url')}/>


        {/* Extra Fields */}
        {!extraFieldPopulated &&
          <Button onClick={() => setShowExtraFields(!showExtraFields)} className='mt-4'>
            {showExtraFields ? 'Hide' : 'Show'} extra fields
          </Button>}

        {showExtraFields &&
        (<>
          {/* Priority */}

          {/* Application date */}

          <TextField
            id="position-level-input"
            label="Position Level"
            variant="outlined"
            className='w-full mt-6'
            value={formValues.position_level}
            onChange={(event) => handleChange(event, 'position_level')}/>

          <div>
            <FormControl fullWidth className='mt-6 w-40'>
              <InputLabel htmlFor="wage-input">Wage</InputLabel>
              <OutlinedInput
                id="wage-input"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Wage"
                type='number'
                value={formValues.position_wage}
                onChange={(event) => handleChange(event, 'position_wage')}
              />
            </FormControl>
          </div>

          <TextField
            id="industry-input"
            label="Industry"
            variant="outlined"
            className='w-full mt-6'
            value={formValues.company_industry}
            onChange={(event) => handleChange(event, 'company_industry')} />

          <TextField
            id="company-website-input"
            label="Company website"
            variant="outlined"
            className='w-full mt-6'
            value={formValues.company_website}
            onChange={(event) => handleChange(event, 'company_website')} />

          <TextField
            id="job-location-input"
            label="Job Location"
            variant="outlined"
            className='w-full mt-6'
            value={formValues.job_location}
            onChange={(event) => handleChange(event, 'job_location')} />

          <TextField
            id="posting-source-input"
            label="Posting Source"
            variant="outlined"
            className='w-full mt-6'
            value={formValues.posting_source}
            onChange={(event) => handleChange(event, 'posting_source')} />

          {/* Job Start */}
        </>

        )}

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
