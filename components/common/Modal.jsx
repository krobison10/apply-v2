import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


export default function Modal({isOpen, title, content, closeModal, maxWidth, fullWidth, closeOffFocus}) {
  function CloseButton() {
    return (
      <IconButton
        aria-label="close"
        onClick={closeModal}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    );
  }
  return (
    <Dialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      open={isOpen}
      onClose={closeOffFocus ? closeModal : () => {}}
    >
      <div className='p-3'>
        <DialogTitle>
          {title}
          <CloseButton />
        </DialogTitle>
        <DialogContent>
          {content}
        </DialogContent>
      </div>
    </Dialog>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  content: PropTypes.element,
  closeModal: PropTypes.func,
  maxWidth: PropTypes.string,
  fullWidth: PropTypes.bool,
  closeOffFocus: PropTypes.bool,
};
