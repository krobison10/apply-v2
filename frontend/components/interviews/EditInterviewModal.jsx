'use client';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import Modal from '@/components/common/Modal';
import InterviewForm from '@/components/interviews/InterviewForm';
import {useApi} from '@/hooks/queries/useApi';

const EditInterviewModal = React.memo(function EditApplicationModal({iid, isOpen, closeModal}) {
  // eslint-disable-next-line no-unused-vars
  const [data, isLoading, error, clearError, getInterview] = useApi('GET', `interviews?iid=${iid}`);

  useEffect(() => {
    if (isOpen) {
      getInterview();
    }
  }, [isOpen]);

  return (
    data &&
      <Modal
        isOpen={isOpen}
        title='Edit Interview'
        content={<InterviewForm closeModal={closeModal} data={data} edit={true}/>}
        closeModal={closeModal}
        maxWidth='md'
        fullWidth={false}
        closeOffFocus={false}/>
  );
});

EditInterviewModal.propTypes = {
  iid: PropTypes.number,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default EditInterviewModal;
