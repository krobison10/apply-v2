'use client';

import {LoadingButton} from '@mui/lab';
import {CircularProgress, Paper, Step, StepLabel, Stepper, TextField, Typography} from '@mui/material';
import React from 'react';
import {useState} from 'react';
import {useApi} from '@/hooks/queries/useApi';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import useAlert from '@/hooks/useAlert';

function OnboardingStepper({className, activeStep}) {
  const steps = [
    'Verify email',
    'Create profile',
    'Done!',
  ];

  return (
    <Stepper activeStep={activeStep} className={className} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

OnboardingStepper.propTypes = {
  className: PropTypes.string,
  activeStep: PropTypes.number.isRequired,
};

function useSkipVerification() {
  // eslint-disable-next-line no-unused-vars
  const [userResponse, isLoading, userResponseError, clearUserResponseError, getUserResponse] = useApi('GET', 'user');
  useEffect(() => {
    getUserResponse();
  }, []);
  return Boolean(userResponse?.email_verified);
}

function ResendCodeButton({...props}) {
  // eslint-disable-next-line no-unused-vars
  const [resendResponse, resendLoading, resendError, clearResendError, resendEmail] = useApi('POST', 'activate?resend');
  const alert = useAlert();

  useEffect(() => {
    if (resendResponse?.success) {
      alert.success('New code sent to your email');
    }
  }, [resendResponse]);

  return (
    <LoadingButton
      loading={resendLoading}
      variant='text'
      size='large'
      color='primary'
      onClick={() => resendEmail({})}
      {...props}
    >
      Resend
    </LoadingButton>
  );
}

function VerifyEmail({setStep}) {
  const [enteredCode, setEnteredCode] = useState('');
  const [error, setError] = useState('');
  const alert = useAlert();

  // eslint-disable-next-line no-unused-vars
  const [verifyEmailResponse, verifyEmailLoading, verifyEmailError, clearVerifyEmailError, verifyEmail] = useApi('POST', 'activate', ['*']);

  useEffect(() => {
    if (verifyEmailResponse?.success) {
      setStep(1);
    }
  }, [verifyEmailResponse]);

  useEffect(() => {
    if (verifyEmailError) {
      const message = verifyEmailError?.message;
      if (message === 'Invalid activation code') {
        setError(verifyEmailError?.message);
      } else {
        alert.error('Error: ' + verifyEmailError?.message);
      }
    }
  }, [verifyEmailError]);

  return (
    <>
      <Typography variant='h4' className='mt-0 text-center font-semibold'>Verify Email</Typography>
      <Typography variant='body1' className='mt-2 text-center'>Please enter the code that was sent to your email</Typography>
      <div className='w-full flex flex-col items-center'>
        <TextField
          id="code-input"
          type='text'
          label="Code"
          variant="outlined"
          className='w-96 mx-auto mt-6'
          error={Boolean(error)}
          helperText={error}
          value={enteredCode}
          onChange={(e) => {
            if (!isNaN(e.target.value) && e.target.value.length <= 6) {
              setEnteredCode(e.target.value);
              setError('');
            }
          }} />

        <LoadingButton
          loading={verifyEmailLoading}
          variant='contained'
          size='large'
          color='primary'
          className='w-96 mt-8'
          onClick={() => verifyEmail({code: enteredCode})}
          disabled={enteredCode.length !== 6 || verifyEmailLoading || Boolean(error)}
        >
          Verify
        </LoadingButton>
        <ResendCodeButton className='w-96 mt-4'/>
      </div>
    </>
  );
}

VerifyEmail.propTypes = {
  setStep: PropTypes.func.isRequired,
};

function CreateProfile({handleSuccess}) {
  const [formValues, setFormValues] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [userResponse, userLoading, userError, clearUserError, getUser] = useApi('GET', 'user');

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (userResponse) {
      setFormValues({
        firstname: userResponse.firstname || '',
        lastname: userResponse.lastname || '',
        username: userResponse.username || '',
      });
    }
  }, [userResponse]);

  // eslint-disable-next-line no-unused-vars
  const [createProfileResponse, createProfileLoading, createProfileError, clearCreateProfileError, createProfile] = useApi('PUT', 'user');

  useEffect(() => {
    if (createProfileResponse?.success) {
      handleSuccess();
    }
  }, [createProfileResponse]);

  function handleInput(event, field) {
    setFormValues({...formValues, [field]: event.target.value});
  }

  return (
    formValues ? <>
      <Typography variant='h4' className='mt-0 text-center font-semibold'>Create Profile</Typography>
      <Typography variant='body1' className='mt-2 text-center'>Tell us a little bit about yourself</Typography>
      <div className='w-full flex flex-col items-center pb-8'>
        <TextField
          id="firstname-input"
          type='text'
          label="First name"
          variant="outlined"
          className='w-96 mx-auto mt-6'
          value={formValues.firstname}
          onChange={(e) => {
            handleInput(e, 'firstname');
          }} />

        <TextField
          id="lastname-input"
          type='text'
          label="Last name"
          variant="outlined"
          className='w-96 mx-auto mt-6'
          value={formValues.lastname}
          onChange={(e) => {
            handleInput(e, 'lastname');
          }} />

        <TextField
          id="username-input"
          type='text'
          label="Username"
          variant="outlined"
          className='w-96 mx-auto mt-6'
          value={formValues.username}
          onChange={(e) => {
            handleInput(e, 'username');
          }} />

        <LoadingButton
          loading={createProfileResponse}
          variant='contained'
          size='large'
          color='primary'
          className='w-96 mt-8'
          onClick={() => createProfile(formValues)}
        >
          Continue
        </LoadingButton>
      </div>
    </> :
    <div className='flex justify-center items-center w-full h-[420px]'>
      <CircularProgress/>
    </div>
  );
}

CreateProfile.propTypes = {
  handleSuccess: PropTypes.func.isRequired,
};

export default function Onboarding() {
  const [step, setStep] = useState(0);

  const skipVerification = useSkipVerification();

  useEffect(() => {
    if (skipVerification) {
      setStep(1);
    }
  }, [skipVerification]);

  function handleSuccess() {
    setStep(2);
    setTimeout(() => {
      window.location.href = '/home';
    }, 2000);
  }

  return (
    <div>
      <div className='my-[100px] mx-auto w-[520px]'>
        <OnboardingStepper activeStep={step}/>
      </div>
      <Paper
        variant='outlined'
        className='my-[100px] mx-auto w-[520px] p-8'>
        {step === 0 && <VerifyEmail setStep={setStep}/>}
        {step === 1 && <CreateProfile handleSuccess={handleSuccess} />}
        {step === 2 &&
            // TODO: nice animation here
            <div className='w-full flex flex-col items-center justify-center h-[420px] p-8'>
              <Typography variant='h4' className='mt-0 text-center font-semibold'>Welcome</Typography>
              <Typography variant='body1' className='mt-2 text-center'>{'You\'re all set!'}</Typography>
            </div>
        }
      </Paper>
    </div>
  );
}
