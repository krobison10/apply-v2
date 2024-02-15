'use client';

import {Button, Paper, TextField} from '@mui/material';
import React, {useState} from 'react';
import {useApi} from '@/hooks/queries/useApi';

export default function Login() {
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  // eslint-disable-next-line no-unused-vars
  const [response, isLoading, error, clearError, login] = useApi('POST', 'login', [409]);
  // const router = useRouter();

  if (response?.success || error?.code === 409) {
    // router.push('/applications');
    window.location.href = '/applications';
  }

  function handleChange(event, field) {
    setFormValues((prevValues) => ({...prevValues, [field]: event.target.value}));
  }

  function handleLogin(e) {
    e.preventDefault();
    const data = {...formValues};
    login(data);
  }

  function renderForm() {
    return (
      <div className='w-full flex flex-col items-center'>
        <TextField
          id="email-input"
          label="Email"
          variant="outlined"
          className='w-96 mx-auto mt-6 '
          value={formValues.email || ''}
          onChange={(event) => handleChange(event, 'email')} />

        <TextField
          id="password-input"
          label="Password"
          variant="outlined"
          className='w-96 mx-auto mt-6 '
          value={formValues.password || ''}
          onChange={(event) => handleChange(event, 'password')} />

        <Button variant='contained' size='large' color='primary' className='w-96 mt-8' onClick={handleLogin}> Log In </Button>
      </div>
    );
  }

  return (
    <div>
      <Paper
        variant='outlined'
        className='fixed top-[220px] left-1/2 transform -translate-x-1/2
            w-[520px] p-8 pb-14'>
        <h1 className='mt-0 text-center'>Log into App.ly </h1>
        {renderForm()}
      </Paper>
    </div>
  );
}
