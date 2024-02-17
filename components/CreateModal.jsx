'use client';
import React from 'react';
import {Box, Button, Tab, Tabs, Typography} from '@mui/material';
import {useState, memo} from 'react';
import PropTypes from 'prop-types';

import Modal from '@/components/common/Modal';
import CreateApplicationForm from '@/components/applications/CreateApplicationForm';


const CreateModal = memo(function CreateModal() {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box className='p-3'>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };


  function CreateModalTabs() {
    const [tab, setTab] = useState(0);

    const handleChange = (event, newTab) => {
      setTab(newTab);
    };

    return (
      <Box className='w-[640px] mt-2'>
        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
          <Tabs value={tab} onChange={handleChange} aria-label="create-options">
            <Tab label="Application" />
            <Tab label="Interview" />
            <Tab label="Goal"/>
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <CreateApplicationForm closeModal={closeModal}/>
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <div className='h-[800px]'>

          </div>
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <div className='h-[800px]'>

          </div>
        </TabPanel>
      </Box>
    );
  }

  function CreateModalContent() {
    return (
      <CreateModalTabs/>
    );
  }

  return (
    <>
      <Button variant='contained' className='mx-2' color='success' onClick={() => openModal()}>Create</Button>
      <Modal
        isOpen={open}
        title='Create'
        content={<CreateModalContent/>}
        closeModal={closeModal}
        maxWidth='md'
        fullWidth={false}
        closeOffFocus={false}/>
    </>
  );
});

export default CreateModal;
