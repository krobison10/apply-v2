'use client';
import React, {useState} from 'react';
import {Button} from '@mui/material';
import {memo} from 'react';
import PropTypes from 'prop-types';

import CreateModalContent from '@/components/CreateModalContent';


const CreateModal = memo(function CreateModal({tabIndex}) {
  const [open, setOpen] = useState(false);
  function openModal() {
    setOpen(true);
  }
  function closeModal() {
    setOpen(false);
  }
  return (
    <>
      <Button variant='contained' className='mx-2' color='success' onClick={() => openModal()}>Create</Button>
      <CreateModalContent
        tabIndex={tabIndex}
        isOpen={open}
        closeModal={closeModal} />
    </>
  );
});

CreateModal.propTypes = {
  tabIndex: PropTypes.number,
};

export default CreateModal;
