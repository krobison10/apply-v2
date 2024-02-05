'use client';

import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../../common/Modal';

/**
 * Create Modal
 * @param {Object} data Application object from the API response
 * @return {React.Component}
 */
export default function CreateApplicationModal({id}) {
  return (
    <Modal id={id} title="Create Application">
      <p>Stuff</p>
    </Modal>
  );
}

CreateApplicationModal.propTypes = {
  id: PropTypes.string,
};
