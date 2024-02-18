import React, {createElement} from 'react';
import useModal from '@/components/providers/modalProvider';

const ModalContainer = () => {
  const {isOpen, closeModal, modal, modalProps} = useModal();
  const extraProps = {isOpen, closeModal, ...modalProps};

  return modal ? createElement(modal, extraProps) : <></>;
};

export default ModalContainer;
