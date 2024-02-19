import React, {memo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Avatar, Button, OutlinedInput, Typography} from '@mui/material';
import {useApi} from '@/hooks/queries/useApi';


function SettingsInput({label, className, containerStyle, onChange, edit, ...remainingProps}) {
  const extraClass = edit ? '' : 'bg-gray-100 border-none outline-none';

  const border = !edit ? 'none' : '';
  const sx = {
    '& .MuiOutlinedInput-notchedOutline': {
      border,
    },
  };

  function handleChange(event) {
    onChange(event);
  }

  return (
    <div className={containerStyle}>
      <div className='w-full'>
        <Typography variant='caption' className='font-medium'>{label}</Typography>
      </div>
      <OutlinedInput
        sx={sx}
        {...remainingProps}
        size='small'
        onChange={handleChange}
        className={`${className} ${extraClass} w-full`}
      />

    </div>
  );
}

SettingsInput.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  containerStyle: PropTypes.string,
  onChange: PropTypes.func,
  edit: PropTypes.bool,
};

const UserForm = memo(function UserForm({userData, closeModal}) {
  const [edit, setEdit] = useState(false);
  const [formValues, setFormValues] = useState({
    firstname: '',
    lastname: '',
    username: '',
    phone: '',
  });

  function initFormValues() {
    setFormValues({
      firstname: userData?.firstname || '',
      lastname: userData?.lastname || '',
      username: userData?.username || '',
      phone: userData?.phone || '',
    });
  }

  useEffect(() => {
    if (userData) {
      initFormValues();
    }
  }, [userData]);

  // eslint-disable-next-line no-unused-vars
  const [updateUserResponse, updateUserIsLoading, updateUserError, clearUpdateUserError, updateUser] = useApi('PUT', 'user');

  if (updateUserResponse) {
    window.location.href = '/settings?user';
  }

  function handleFormChange(event, field) {
    setFormValues({...formValues, [field]: event.target.value});
  }

  return (
    <div className='w-96 p-6'>
      <div className='w-full flex items-center'>
        <Avatar>{formValues.firstname[0]}{formValues.lastname[0]}</Avatar>
        <Typography variant='h4' className='font-medium text-center ml-3'>{formValues.firstname} {formValues.lastname}</Typography>
      </div>

      <SettingsInput
        edit={edit}
        id="first-name-input"
        label="First name"
        containerStyle='w-full mt-4'
        variant="outlined"
        value={formValues.firstname}
        onMouseDown={() => setEdit(true)}
        onChange={(event) => handleFormChange(event, 'firstname')}
      />

      <SettingsInput
        edit={edit}
        id="last-name-input"
        label="Last name"
        containerStyle='w-full mt-4'
        variant="outlined"
        value={formValues.lastname}
        onMouseDown={() => setEdit(true)}
        onChange={(event) => handleFormChange(event, 'lastname')}
      />

      <SettingsInput
        edit={false}
        id="email-input"
        label="Email"
        containerStyle='w-full mt-4'
        variant="outlined"
        value={userData.email}
        onChange={() => {}}
        className={'select-none'}
      />

      <SettingsInput
        edit={edit}
        id="username-input"
        label="Username"
        containerStyle='w-full mt-4'
        variant="outlined"
        value={formValues.username}
        onMouseDown={() => setEdit(true)}
        onChange={(event) => handleFormChange(event, 'username')}
      />

      <SettingsInput
        edit={edit}
        id="phone-input"
        label="Phone"
        containerStyle='w-full mt-4'
        variant="outlined"
        value={formValues.phone}
        onMouseDown={() => setEdit(true)}
        onChange={(event) => handleFormChange(event, 'phone')}
      />

      <div className='w-full flex mt-8 mb-6'>
        {edit &&
        <>
          <Button
            color='primary'
            variant='contained'
            onClick={() => updateUser(formValues)}
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
        </>
        }
      </div>

    </div>
  );
});

UserForm.propTypes = {
  userData: PropTypes.object,
  edit: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default UserForm;
