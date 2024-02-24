'use client';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Button, FormControl, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography} from '@mui/material';
import {useApi} from '@/hooks/queries/useApi';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import {styled} from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SelectInput from '@/components/common/form/SelectInput';
import {capitalizeFirstLetter, fileToBase64} from '@/utils/helpers';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// See: https://www.freecodecamp.org/news/how-to-build-forms-in-react/
export default function ApplicationForm({data, edit, closeModal}) {
  const [formValues, setFormValues] = useState({
    position_title: '',
    company_name: '',
    status: 'Submitted',
    application_date: dayjs(),
    posting_url: '',
    notes: '',
    resume: undefined,
    cover_letter: undefined,

    priority: 0,
    position_level: '',
    position_wage: null,
    company_industry: '',
    company_website: '',
    job_location: '',
    posting_source: '',
    job_start: undefined,
  });

  useEffect(() => {
    if (data && edit) {
      setFormValues({
        position_title: data?.position_title || '',
        company_name: data?.company_name || '',
        status: capitalizeFirstLetter(data?.status) || 'Submitted',
        application_date: data?.application_date || undefined,
        posting_url: data?.posting_url || '',
        notes: data?.notes || '',
        resume: data.resume_url || undefined,
        cover_letter: data.cover_letter_url || undefined,

        priority: data?.priority || 0,
        position_level: data?.position_level || '',
        position_wage: data?.position_wage || null,
        company_industry: data?.company_industry || '',
        company_website: data?.company_website || '',
        job_location: data?.job_location || '',
        posting_source: data?.posting_source || '',
        job_start: data?.job_start || undefined,
      });
    }
  }, [data]);

  const extraFieldPopulated = formValues.priority || formValues.position_level ||
  formValues.position_wage || formValues.company_industry || formValues.company_website ||
  formValues.job_location || formValues.posting_source || formValues.job_start;

  useEffect(() => {
    if (extraFieldPopulated) {
      setShowExtraFields(true);
    }
  }, [extraFieldPopulated]);

  // eslint-disable-next-line no-unused-vars
  const [response, isLoading, error, clearError, createApplication] = useApi(edit ? 'PUT' : 'POST', `applications${edit ? `?aid=${data?.aid}` : ''}`);

  const [showExtraFields, setShowExtraFields] = useState(extraFieldPopulated);

  if (response) {
    closeModal();
    window.location.href = '/applications';
  }

  function handleChange(event, field) {
    setFormValues({...formValues, [field]: event.target.value});
  }

  function handleTimeSelect(newValue, field) {
    setFormValues({...formValues, [field]: newValue});
  }

  async function submitForm(e) {
    e.preventDefault();
    const data = {...formValues};
    data.resume = data.resume ? await fileToBase64(data.resume) : null;
    data.cover_letter = data.cover_letter ? await fileToBase64(data.cover_letter) : null;
    data.status = data.status.toLowerCase();
    data.position_wage = Number.parseFloat(data.position_wage || 0);
    console.log(data);
    createApplication(data);
  }

  return (
    <div className='pt-2 w-[600px]'>
      <div>
        <TextField
          id="job-title-input"
          label="Position"
          variant="outlined"
          className='w-full mt-3'
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
          options={['Not submitted', 'Submitted', 'Responded', 'Rejected', 'Interviewing', 'Offer received', 'Withdrawn', 'Closed']}
          value={formValues.status}
          onChange={(event) => handleChange(event, 'status')} />

        <DatePicker
          value={formValues.application_date ? dayjs(formValues.application_date) : null}
          onChange={(newValue) => handleTimeSelect(newValue, 'application_date')}
          label="Submit Date"
          className='w-64 mt-6'/>

        <TextField
          id="posting-url-input"
          label="Posting Link"
          variant="outlined"
          className='w-full mt-6'
          value={formValues.posting_url}
          onChange={(event) => handleChange(event, 'posting_url')}/>

        <TextField
          id="notes-input"
          label="Notes"
          multiline
          className='w-full mt-6'
          value={formValues.notes}
          onChange={(event) => handleChange(event, 'notes')} />

        <div className='w-full mt-6'>
          <Button
            className='w-[160px] mx-auto'
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onChange={(e) => {
              console.log(e.target.files[0]);
              setFormValues({...formValues, resume: e.target.files[0]});
            }}
          >
            Resume
            <VisuallyHiddenInput type="file" accept='.pdf'/>
          </Button>
        </div>
        {formValues.resume &&
          <Typography
            variant='caption'>
            {formValues.resume?.name ? formValues.resume.name : <Link href={formValues.resume}>Download current</Link> }
            {formValues.resume?.size ? <> ({Math.round(formValues.resume.size / 1024)} KB)</> : '' }
          </Typography>}

        <div className='w-full mt-6'>
          <Button
            className='w-[160px] mx-auto'
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onChange={(e) => {
              console.log(e.target.files[0]);
              setFormValues({...formValues, cover_letter: e.target.files[0]});
            }}
          >
            Cover Letter
            <VisuallyHiddenInput type="file" accept='.pdf'/>
          </Button>

        </div>
        {formValues.cover_letter &&
          <Typography
            variant='caption'>
            {formValues.cover_letter?.name ? formValues.cover_letter.name : <Link href={formValues.cover_letter}>Download current</Link> }
            {formValues.cover_letter?.size ? <> ({Math.round(formValues.cover_letter.size / 1024)}) KB</> : '' }
          </Typography>}


        {/* Extra Fields */}
        {!extraFieldPopulated &&
          <div>
            <Button onClick={() => setShowExtraFields(!showExtraFields)} className='mt-6'>
              {showExtraFields ? 'Hide' : 'Show'} extra fields
            </Button>
          </div>
        }

        {showExtraFields &&
        (<>
          {/* Priority */}

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

          <DatePicker
            value={formValues.job_start ? dayjs(formValues.job_start) : null}
            onChange={(newValue) => handleTimeSelect(newValue, 'job_start')}
            label="Start Date"
            className='w-64 mt-6'/>
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
          {edit ? 'Submit' : 'Create Application'}
        </Button>
      </div>
    </div>
  );
}

ApplicationForm.propTypes = {
  data: PropTypes.object,
  edit: PropTypes.bool,
  closeModal: PropTypes.func,
};
