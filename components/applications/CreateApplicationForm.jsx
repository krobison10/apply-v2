'use client';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField} from '@mui/material';
import {useApi} from '@/hooks/queries/useApi';

import SelectInput from '@/components/common/form/SelectInput';

// See: https://www.freecodecamp.org/news/how-to-build-forms-in-react/
export default function CreateApplicationForm({closeModal}) {
  const [formValues, setFormValues] = useState({
    title: '',
    company: '',
    status: 'Not Submitted',
    description: '',

    field: '',
    position: '',
    wage: null,
    industry: '',
    website: '',
    phone: '',

  });

  const extraFieldPopulated = formValues.field || formValues.position || formValues.wage || formValues.industry || formValues.website || formValues.phone;

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
    data.wage = Number.parseFloat(data.wage || 0);
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
          value={formValues.title}
          onChange={(event) => handleChange(event, 'title')} />

        <TextField
          id="company-input"
          label="Company"
          variant="outlined"
          className='w-full mt-6'
          value={formValues.company}
          onChange={(event) => handleChange(event, 'company')} />

        <SelectInput
          className='w-40 mt-6'
          name='status'
          label="Status"
          defaultValue='Not Submitted'
          options={['Not Submitted', 'Submitted', 'Ignored', 'Responded', 'Interviewing', 'Offered', 'Rejected', 'Accepted']}
          value={formValues.status}
          onChange={(event) => handleChange(event, 'status')} />

        <TextField
          id="description-input"
          label="Description"
          multiline
          className='w-full mt-6'
          value={formValues.description}
          onChange={(event) => handleChange(event, 'description')} />


        {/* Extra Fields */}
        {!extraFieldPopulated &&
          <Button onClick={() => setShowExtraFields(!showExtraFields)} className='mt-4'>
            {showExtraFields ? 'Hide' : 'Show'} extra fields
          </Button>}

        {showExtraFields &&
        (<>
          <TextField
            id="field-input"
            label="Field"
            variant="outlined"
            className='w-full mt-6'
            value={formValues.field}
            onChange={(event) => handleChange(event, 'field')}/>

          <TextField
            id="level-input"
            label="Level"
            variant="outlined"
            className='w-full mt-6'
            value={formValues.position}
            onChange={(event) => handleChange(event, 'position')}/>

          <div>
            <FormControl fullWidth className='mt-6 w-40'>
              <InputLabel htmlFor="wage-input">Wage</InputLabel>
              <OutlinedInput
                id="wage-input"
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                label="Wage"
                type='number'
                value={formValues.wage}
                onChange={(event) => handleChange(event, 'wage')}
              />
            </FormControl>
          </div>

          <TextField
            id="industry-input"
            label="Industry"
            variant="outlined"
            className='w-full mt-6'
            value={formValues.industry}
            onChange={(event) => handleChange(event, 'industry')} />

          <TextField
            id="company-website-input"
            label="Company website"
            variant="outlined"
            className='w-full mt-6'
            value={formValues.website}
            onChange={(event) => handleChange(event, 'website')} />

          <TextField
            id="company-phone-input"
            label="Company phone"
            variant="outlined"
            className='w-full mt-6'
            value={formValues.phone}
            onChange={(event) => handleChange(event, 'phone')}/>

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
