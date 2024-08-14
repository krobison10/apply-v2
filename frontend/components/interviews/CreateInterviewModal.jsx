'use client';
import React from 'react';
import PropTypes from 'prop-types';

import Modal from '@/components/common/Modal';
import InterviewForm from '@/components/interviews/InterviewForm';

const CreateInterviewModal = React.memo(function EditApplicationModal({isOpen, closeModal, aid}) {
  const data = {};
  if (aid) {
    data.aid = aid;
  }

  return (
    <Modal
      isOpen={isOpen}
      title='Create Interview'
      content={<InterviewForm closeModal={closeModal} data={data} edit={false}/>}
      closeModal={closeModal}
      maxWidth='md'
      fullWidth={false}
      closeOffFocus={false}/>
  );
});

CreateInterviewModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  aid: PropTypes.number,
};

export default CreateInterviewModal;
