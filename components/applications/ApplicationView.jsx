'use client';

import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from '@/components/common/loadingSpinner';
import {Button, InputAdornment, Link, OutlinedInput, TextField, Typography} from '@mui/material';
import {useApi} from '@/hooks/queries/useApi';
import HybridInput from '@/components/common/form/HybridInput';
import dayjs from 'dayjs';
import {capitalizeFirstLetter, formatSinceDateNicely, isValidUrl, fileToBase64} from '@/utils/helpers';
import {useConfirm} from 'material-ui-confirm';
import SelectInput from '@/components/common/form/SelectInput';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {VisuallyHiddenInput} from '@/utils/helpers';


function PlaceholderInput({label, value, className, multiline, ...props}) {
  const height = multiline ? 'min-h-10' : 'h-10';
  return (
    <div className={className}>
      {label && <div className='w-full'>
        <Typography variant='caption' className='font-medium'>{label}</Typography>
      </div>}
      <div className={`w-full bg-gray-100 rounded-[4px] py-2 px-[14px] cursor-text ${height}`} {...props}>
        <Typography variant='body1'>{value}</Typography>
      </div>
    </div>
  );
}

PlaceholderInput.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  className: PropTypes.string,
  onMouseDown: PropTypes.func,
  multiline: PropTypes.bool,
};

const narrowWidth = 52;

function ApplicationViewForm({applicationData, refetchApplicationData}) {
  // ---------- Form & AutoFill Functionality ----------
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
    position_wage: undefined,
    company_industry: '',
    company_website: '',
    job_location: '',
    posting_source: '',
    job_start: undefined,
  });

  function initFormValues() {
    setFormValues({
      position_title: applicationData?.position_title || '',
      company_name: applicationData?.company_name || '',
      status: capitalizeFirstLetter(applicationData?.status) || 'Submitted',
      application_date: applicationData?.application_date || undefined,
      posting_url: applicationData?.posting_url || '',
      notes: applicationData?.notes || '',
      resume: applicationData.resume_url || undefined,
      cover_letter: applicationData.cover_letter_url || undefined,

      priority: applicationData?.priority || 0,
      position_level: applicationData?.position_level || '',
      position_wage: applicationData?.position_wage || undefined,
      company_industry: applicationData?.company_industry || '',
      company_website: applicationData?.company_website || '',
      job_location: applicationData?.job_location || '',
      posting_source: applicationData?.posting_source || '',
      job_start: applicationData?.job_start || undefined,
    });
  }

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (applicationData) {
      initFormValues();
    }
  }, [applicationData]);

  function handleTimeSelect(newValue, field) {
    setFormValues({...formValues, [field]: newValue});
  }

  function handleChange(event, field) {
    setFormValues({...formValues, [field]: event.target.value});
  }


  // ---------- Update Functionality ----------

  // eslint-disable-next-line no-unused-vars
  const [updateResponse, updateIsLoading, updateError, clearUpdateError, updateApplication] = useApi('PUT', `applications?aid=${applicationData.aid}`);

  useEffect(() => {
    if (updateResponse) {
      refetchApplicationData();
    }
  }, [updateResponse]);

  async function submitForm(e) {
    e.preventDefault();
    const data = {...formValues};

    if (data.resume && !isValidUrl(data.resume)) {
      data.resume_name = data.resume.name;
      data.resume = await fileToBase64(data.resume);
    }

    if (data.cover_letter && !isValidUrl(data.cover_letter)) {
      data.cover_letter_name = data.cover_letter.name;
      data.cover_letter = await fileToBase64(data.cover_letter);
    }

    data.status = data.status.toLowerCase();
    data.position_wage = Number.parseFloat(data.position_wage || 0);

    updateApplication(data);
  }

  // ---------- Delete Functionality ----------
  const confirmDelete = useConfirm();
  // eslint-disable-next-line no-unused-vars
  const [deleteResponse, deleteIsLoading, deleteError, clearDeleteError, deleteApplication] = useApi('DELETE', `applications?aid=${applicationData.aid}`);

  if (deleteResponse) {
    window.location.href = '/applications';
  }

  function handleDelete() {
    // https://github.com/jonatanklosko/material-ui-confirm
    confirmDelete({
      title: 'Delete Application?',
      description: 'Are you sure you want to delete this application? This action cannot be undone.',
      confirmationText: 'Delete',
      cancellationTest: 'Cancel',
      confirmationButtonProps: {variant: 'contained', color: 'error'},
      cancellationButtonProps: {variant: 'outlined'},
      allowClose: true,
      dialogProps: {maxWidth: 'xs'},
    })
        .then(() => {
          deleteApplication();
        });
  }

  function renderDate() {
    if (applicationData.created_at === applicationData.updated_at) {
      return <>Created {formatSinceDateNicely(applicationData.created_at)}</>;
    } else {
      return <>Edited {formatSinceDateNicely(applicationData.updated_at)}</>;
    }
  };

  return (
    <div className='w-full p-6'>
      <div className='w-full flex items-center'>
        <Typography variant='h5' className='text-center'>
          {applicationData.company_name} | {applicationData.position_title}
        </Typography>
      </div>

      <Typography variant="body2" className="mt-2 text-bold">
        {renderDate()}
      </Typography>

      <div>
        {/* --------------- Job title --------------- */}
        <HybridInput
          edit={edit}
          id="job-title-input"
          label="Position"
          containerStyle='w-full mt-4'
          variant="outlined"
          onMouseDown={() => setEdit(true)}
          value={formValues.position_title}
          onChange={(event) => handleChange(event, 'position_title')}
        />

        {/* --------------- Company --------------- */}
        <HybridInput
          edit={edit}
          id="company-input"
          label="Company"
          containerStyle='w-full mt-4'
          variant="outlined"
          onMouseDown={() => setEdit(true)}
          value={formValues.company_name}
          onChange={(event) => handleChange(event, 'company_name')}
        />

        {/* --------------- Status --------------- TODO focus on edit*/}
        <div className={`w-${narrowWidth} mt-4`}>
          { edit ?
            <div className='w-full'>
              <div className='w-full'>
                <Typography variant='caption' className='font-medium'>Status</Typography>
              </div>
              <SelectInput
                className='w-full'
                name='status'
                size='small'
                options={['Not submitted', 'Submitted', 'Responded', 'Rejected', 'Interviewing', 'Offer received', 'Withdrawn', 'Closed']}
                value={formValues.status}
                onChange={(event) => handleChange(event, 'status')} />
            </div> :
            <PlaceholderInput
              className='w-full'
              label='Status'
              value={formValues.status}
              onMouseDown={() => setEdit(true)}
            />
          }
        </div>


        {/* --------------- Application Date --------------- */}
        <div className={`w-${narrowWidth} mt-4`}>
          { edit ?
            <div className='w-full'>
              <div className='w-full'>
                <Typography variant='caption' className='font-medium'>Application Date</Typography>
              </div>
              <DatePicker
                value={formValues.application_date ? dayjs(formValues.application_date) : null}
                onChange={(newValue) => handleTimeSelect(newValue, 'application_date')}
                className='w-full'
                slotProps={{textField: {size: 'small'}}}
              />
            </div> :
            <PlaceholderInput
              className='w-full'
              label='Application Date'
              value={formValues.application_date ? dayjs(formValues.application_date).format('MM/DD/YYYY') : ''}
              onMouseDown={() => setEdit(true)}
            />
          }
        </div>

        {/* --------------- Posting Link --------------- */}
        <div className='w-full mt-4'>
          { edit ?
            <div className='w-full'>
              <div className='w-full'>
                <Typography variant='caption'>Posting Link</Typography>
              </div>
              <TextField
                id="posting-url-input"
                variant="outlined"
                className='w-full'
                multiline
                size='small'
                value={formValues.posting_url}
                onChange={(event) => handleChange(event, 'posting_url')}/>
            </div> :
            <PlaceholderInput
              className='w-full'
              label='Posting Link'
              multiline
              value={<Link href={formValues.posting_url} classes={{root: 'break-all'}} target='_blank'>{formValues.posting_url}</Link>}
              onClick={(e) => {
                if (e.target.tagName !== 'A') {
                  setEdit(true);
                }
              }}
            />
          }
        </div>


        {/* --------------- Notes --------------- */}
        <HybridInput
          edit={edit}
          id="notes-input"
          label="Notes"
          multiline
          minRows={8}
          containerStyle='w-full mt-4'
          variant="outlined"
          onMouseDown={() => setEdit(true)}
          value={formValues.notes}
          onChange={(event) => handleChange(event, 'notes')}
        />

        {/* --------------- Resume --------------- */}
        <div className='w-full mt-4'>
          <div className='w-full'>
            <Typography variant='caption' className='font-medium'>Resume</Typography>
          </div>
          {formValues.resume && <PlaceholderInput
            className='w-full'
            value={formValues.resume?.name ? formValues.resume.name : <Link href={formValues.resume}>{formValues.resume}</Link>}
          />}
          <Button
            className='w-[160px] mt-2'
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            size='medium'
            startIcon={<CloudUploadIcon />}
            onMouseDown={() => setEdit(true)}
            onChange={(e) => {
              setFormValues({...formValues, resume: e.target.files[0]});
            }}
          >
            Upload {formValues.resume ? 'New' : ''}
            <VisuallyHiddenInput type="file" accept='.pdf'/>
          </Button>
        </div>

        {/* --------------- Cover letter --------------- */}
        <div className='w-full mt-4'>
          <div className='w-full'>
            <Typography variant='caption' className='font-medium'>Cover Letter</Typography>
          </div>
          {formValues.cover_letter && <PlaceholderInput
            className='w-full'
            value={
              formValues.cover_letter?.name ?
              formValues.cover_letter.name :
              <Link href={formValues.cover_letter}>{formValues.cover_letter}</Link>}
          />}
          <Button
            className='w-[160px] mt-2'
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            size='medium'
            startIcon={<CloudUploadIcon />}
            onMouseDown={() => setEdit(true)}
            onChange={(e) => {
              setFormValues({...formValues, cover_letter: e.target.files[0]});
            }}
          >
            Upload {formValues.cover_letter ? 'New' : ''}
            <VisuallyHiddenInput type="file" accept='.pdf'/>
          </Button>
        </div>

        {/* --------------- Position Level --------------- */}
        <HybridInput
          edit={edit}
          id="position-level-input"
          label="Position Level"
          containerStyle='w-full mt-4'
          variant="outlined"
          onMouseDown={() => setEdit(true)}
          value={formValues.position_level}
          onChange={(event) => handleChange(event, 'position_level')}
        />

        {/* --------------- Wage --------------- */}
        <div className={`w-${narrowWidth} mt-4`}>
          { edit ?
            <div className='w-full'>
              <div className='w-full'>
                <Typography variant='caption' className='font-medium'>Wage</Typography>
              </div>
              <div className='w-full'>
                <OutlinedInput
                  id="wage-input"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  type='number'
                  size='small'
                  value={formValues.position_wage}
                  onChange={(event) => handleChange(event, 'position_wage')}
                />
              </div>
            </div> :
            <PlaceholderInput
              className='w-full'
              label='Wage'
              value={formValues.position_wage ? `$${formValues.position_wage}` : ''}
              onMouseDown={() => setEdit(true)}
            />
          }
        </div>


        {/* --------------- Industry --------------- */}
        <HybridInput
          edit={edit}
          id="industry-input"
          label="Industry"
          containerStyle='w-full mt-4'
          variant="outlined"
          onMouseDown={() => setEdit(true)}
          value={formValues.company_industry}
          onChange={(event) => handleChange(event, 'company_industry')}
        />

        {/* --------------- Company Website --------------- */}
        <div className='w-full mt-4'>
          { edit ?
            <div className='w-full'>
              <div className='w-full'>
                <Typography variant='caption' className='font-medium'>Company Website</Typography>
              </div>
              <TextField
                id="company-website-input"
                variant="outlined"
                className='w-full'
                multiline
                size='small'
                value={formValues.company_website}
                onChange={(event) => handleChange(event, 'company_website')}/>
            </div> :
            <PlaceholderInput
              className='w-full'
              label='Company Website'
              multiline
              value={<Link href={formValues.company_website} classes={{root: 'break-all'}} target='_blank'>{formValues.company_website}</Link>}
              onClick={(e) => {
                if (e.target.tagName !== 'A') {
                  setEdit(true);
                }
              }}
            />
          }
        </div>

        {/* --------------- Job Location --------------- */}
        <HybridInput
          edit={edit}
          id="job-location-input"
          label="Job Location"
          containerStyle='w-full mt-4'
          variant="outlined"
          onMouseDown={() => setEdit(true)}
          value={formValues.job_location}
          onChange={(event) => handleChange(event, 'job_location')}
        />

        {/* --------------- Posting Source --------------- */}
        <HybridInput
          edit={edit}
          id="posting-source-input"
          label="Posting Source"
          containerStyle='w-full mt-4'
          variant="outlined"
          onMouseDown={() => setEdit(true)}
          value={formValues.posting_source}
          onChange={(event) => handleChange(event, 'posting_source')}
        />

        {/* --------------- Start Date --------------- */}
        <div className={`w-${narrowWidth} mt-4`}>
          { edit ?
          <div className='w-full'>
            <div className='w-full'>
              <Typography variant='caption' className='font-medium'>Start Date</Typography>
            </div>
            <DatePicker
              value={formValues.job_start ? dayjs(formValues.job_start) : null}
              onChange={(newValue) => handleTimeSelect(newValue, 'job_start')}
              className='w-full'
              slotProps={{textField: {size: 'small'}}}
            />
          </div> :
          <PlaceholderInput
            className='w-full'
            label='Start Date'
            value={formValues.job_start ? dayjs(formValues.job_start).format('MM/DD/YYYY') : ''}
            onMouseDown={() => setEdit(true)}
          />
          }
        </div>

      </div>

      <div className='w-full flex mt-8 mb-6'>
        {edit ?
        <>
          <Button
            color='primary'
            variant='contained'
            onClick={(e) => submitForm(e)}
          >
          Save Changes
          </Button>
          <Button
            variant='text'
            className='ml-4'
            onClick={() => {
              setEdit(false);
              initFormValues();
            }}
          >
          Cancel
          </Button>
        </> :
        <Button
          variant='outlined'
          color='error'
          onClick={() => {
            handleDelete();
          }}>
            Delete Application
        </Button>
        }
      </div>

    </div>
  );
}

ApplicationViewForm.propTypes = {
  applicationData: PropTypes.object,
  refetchApplicationData: PropTypes.func,
};


export default function ApplicationView({aid}) {
  // eslint-disable-next-line no-unused-vars
  const [applicationData, isLoading, applicationFetchError, clearApplicationFetchError, getApplication] = useApi('GET', `applications?aid=${aid}`);

  useEffect(() => {
    if (aid && !applicationData) {
      getApplication();
    }
  }, [aid]);

  function callRetry() {
    clearApplicationFetchError();
    getApplication();
  }

  function renderTryAgain() {
    return (
      <div className='flex justify-center items-center w-full h-[460px]'>
        <div className='w-96'>
          <Typography variant='h5' className='text-center'>Failed to fetch application</Typography>
          <div className='flex justify-center pt-4'>
            <Button variant='contained' color='primary' onClick={callRetry}>Try again</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full rounded-md bg-white shadow-sm mt-6'>
      {isLoading && <LoadingSpinner containerHeight='h-[460px]' loading/>}
      {applicationData &&
        <ApplicationViewForm
          key={applicationData.updated_at}
          applicationData={applicationData}
          refetchApplicationData={() => getApplication()}/>
      }
      {applicationFetchError && renderTryAgain()}
    </div>
  );
}

ApplicationView.propTypes = {
  aid: PropTypes.number,
};
