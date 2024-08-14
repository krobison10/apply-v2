'use client';

import {FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography} from '@mui/material';
import React, {useState} from 'react';
import {useApi} from '@/hooks/queries/useApi';
import {Visibility, VisibilityOff} from '@mui/icons-material';
import PropTypes from 'prop-types';
import LoadingButton from '@mui/lab/LoadingButton';

function PasswordInput({className, value, handleChange, error, helpertext}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{m: 1, width: '25ch'}} variant="outlined" className={className} >
      <InputLabel htmlFor="password-input" error={error}>Password</InputLabel>
      <OutlinedInput
        id="password-input"
        className='w-full'
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={handleChange}
        error={error}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      {error && <FormHelperText error={error}>{helpertext}</FormHelperText>}
    </FormControl>
  );
}
PasswordInput.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  error: PropTypes.bool,
  helpertext: PropTypes.string,
};

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });

  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  // eslint-disable-next-line no-unused-vars
  const [response, isLoading, error, clearError, login] = useApi('POST', 'login', [409]);
  // const router = useRouter();

  if (response?.success) {
    // Handle this better to prevent user from getting stuck
    if (response?.onboard) {
      window.location.href = '/onboarding';
    } else {
      window.location.href = '/applications';
    }
  }

  function handleChange(event, field) {
    setFormValues((prevValues) => ({...prevValues, [field]: event.target.value}));
    setFormErrors((prevErrors) => ({...prevErrors, [field]: ''}));
  }

  function handleLogin(e) {
    e.preventDefault();

    let hasError = false;

    // Set form errors
    if (formValues.email.length === 0) {
      setFormErrors((prevErrors) => ({...prevErrors, email: 'Email is required'}));
      hasError = true;
    }

    if (formValues.password.length === 0) {
      setFormErrors((prevErrors) => ({...prevErrors, password: 'Password is required'}));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Send request
    const data = {...formValues};
    login(data);
  }

  function renderForm() {
    return (
      <div className='w-full flex flex-col items-center'>
        <TextField
          id="email-input"
          type='email'
          label="Email"
          variant="outlined"
          className='w-96 mx-auto mt-6 '
          error={!!formErrors.email}
          helperText={formErrors.email}
          value={formValues.email}
          onChange={(event) => handleChange(event, 'email')} />

        <PasswordInput
          className='w-96 mx-auto mt-6'
          value={formValues.password}
          handleChange={(event) => handleChange(event, 'password')}
          error={!!formErrors.password}
          helpertext={formErrors.password}
        />

        <LoadingButton
          loading={isLoading}
          variant='contained'
          size='large'
          color='primary'
          className='w-96 mt-8'
          onClick={handleLogin}
        >
        Log In
        </LoadingButton>
      </div>
    );
  }

  return (
    <div>
      <Paper
        variant='outlined'
        className='my-[220px] mx-auto w-[520px] p-8'>
        <Typography variant='h4' className='mt-0 text-center font-semibold'>Log in</Typography>
        {renderForm()}
        <Typography variant='body1' className='text-center w-96 mx-auto mt-6'>
          No account yet? Enter your email and choose a password here.
        </Typography>
      </Paper>
    </div>
  );
}
