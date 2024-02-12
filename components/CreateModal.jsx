'use client';
import React from 'react';
import {Button} from '@mui/material';
import {useState} from 'react';

import Modal from '@/components/common/Modal';
import CreateApplicationForm from '@/components/applications/CreateApplicationForm';


export default function CreateModal() {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  function CreateModalContent() {
    return (
      <CreateApplicationForm/>
    );
  }

  return (
    <>
      <Button variant='contained' className='mx-4' color='success' onClick={() => openModal()}>Create</Button>
      <Modal
        isOpen={open}
        title='Create Application'
        content={<CreateModalContent/>}
        closeModal={closeModal}
        maxWidth='sm'
        fullWidth={true}
        closeOffFocus={false}/>
    </>
  );
}
