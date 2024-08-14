'use client';
import React from 'react';
import {Box, Tab, Tabs} from '@mui/material';
import {useState, memo} from 'react';
import PropTypes from 'prop-types';

import Modal from '@/components/common/Modal';
import ApplicationForm from '@/components/applications/ApplicationForm';
import InterviewForm from '@/components/interviews/InterviewForm';
import TabPanel from '@/components/common/TabPanel';

function CreateModalTabs({tabIndex, closeModal}) {
  const [tab, setTab] = useState(tabIndex || 0);

  const handleChange = (event, newTab) => {
    setTab(newTab);
  };

  return (
    <Box>
      <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={tab} onChange={handleChange} aria-label="create-options">
          <Tab label="Application" />
          <Tab label="Interview" />
          <Tab label="Goal"/>
        </Tabs>
      </Box>
      <TabPanel value={tab} index={0}>
        <ApplicationForm closeModal={closeModal}/>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <InterviewForm closeModal={closeModal}/>
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <div className='h-[600px] w-[600px]'>

        </div>
      </TabPanel>
    </Box>
  );
}

CreateModalTabs.propTypes = {
  tabIndex: PropTypes.number,
  closeModal: PropTypes.func,
};

const CreateModal = memo(function CreateModal({tabIndex, isOpen, closeModal}) {
  return (
    <Modal
      isOpen={isOpen}
      title='Create'
      content={<CreateModalTabs tabIndex={tabIndex} closeModal={closeModal} />}
      closeModal={closeModal}
      maxWidth='md'
      fullWidth={false}
      closeOffFocus={false}/>
  );
});

CreateModal.propTypes = {
  tabIndex: PropTypes.number,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default CreateModal;
