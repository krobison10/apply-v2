import React, {createContext, useContext, useState} from 'react';
import PropTypes from 'prop-types';
import ModalContainer from '@/components/ModalContainer';

const ModalContext = createContext();

function useModal() {
  return useContext(ModalContext);
}

const ModalProvider = ({children}) => {
  const [modal, setModal] = useState(null);
  const [modalProps, setModalProps] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const showModal = (modal, modalProps) => {
    setModalProps(modalProps);
    setModal(modal);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModal(null);
    setModalProps(null);
  };

  return (
    <ModalContext.Provider value={{showModal, closeModal, isOpen, modal, modalProps}}>
      {children}
      <ModalContainer/>
    </ModalContext.Provider>
  );
};
ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export {ModalProvider};
export default useModal;
