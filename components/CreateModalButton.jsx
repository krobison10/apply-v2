'use client';
import React from 'react';
import {Button} from '@mui/material';
import PropTypes from 'prop-types';

import CreateModal from '@/components/CreateModal';
import useModal from '@/components/providers/modalProvider';


function CreateModalButton({tabIndex}) {
  const {showModal} = useModal();

  return (
    <Button
      variant='contained'
      className='mx-2'
      color='success'
      onClick={() => showModal(CreateModal, {tabIndex})}>
      Create
    </Button>
  );
};

CreateModalButton.propTypes = {
  tabIndex: PropTypes.number,
};

export default CreateModalButton;
