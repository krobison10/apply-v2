'use client';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

import Modal from '@/components/common/Modal';
import ApplicationForm from '@/components/applications/ApplicationForm';
import {useApi} from '@/hooks/queries/useApi';

const EditApplicationModal = React.memo(function EditApplicationModal({aid, isOpen, closeModal}) {
  // eslint-disable-next-line no-unused-vars
  const [data, isLoading, error, clearError, getApplication] = useApi('GET', `applications?aid=${aid}`);

  useEffect(() => {
    if (isOpen) {
      getApplication();
    }
  }, [isOpen]);

  return (
    data &&
      <Modal
        isOpen={isOpen}
        title='Edit Application'
        content={<ApplicationForm closeModal={closeModal} data={data} edit={true}/>}
        closeModal={closeModal}
        maxWidth='md'
        fullWidth={false}
        closeOffFocus={false}/>
  );
});

EditApplicationModal.propTypes = {
  aid: PropTypes.number,
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};

export default EditApplicationModal;
