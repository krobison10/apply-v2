'use client';

import React, {useState} from 'react';
import PropTypes from 'prop-types';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import BusinessIcon from '@mui/icons-material/Business';
import PushPinIcon from '@mui/icons-material/PushPin';
import ArchiveIcon from '@mui/icons-material/Archive';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import DeleteIcon from '@mui/icons-material/Delete';

import {Divider, IconButton, ListItemText, Menu, MenuItem} from '@mui/material';
import {ContentCut} from '@mui/icons-material';
import {useApi} from '@/hooks/queries/useApi';
import {useConfirm} from 'material-ui-confirm';
import EditApplicationModal from '@/components/applications/EditApplicationModal';
import CreateInterviewModal from '@/components/interviews/CreateInterviewModal';
import useModal from '@/components/providers/modalProvider';

const fontSizeString = 'small';
const menuItemClassName = 'ml-2';

function ApplicationCardMenu({aid}) {
  const [anchor, setAnchor] = useState(null);
  const {showModal} = useModal();

  // eslint-disable-next-line no-unused-vars
  const [data, isLoading, error, clearError, deleteApplication] = useApi('DELETE', `applications?aid=${aid}`);
  const confirmDelete = useConfirm();

  const open = Boolean(anchor);

  if (data) {
    window.location.reload();
  }

  const handleOpenClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleDelete = () => {
    // https://github.com/jonatanklosko/material-ui-confirm
    confirmDelete({
      title: 'Delete application',
      description: 'Are you sure you want to delete this application? This action cannot be undone.',
      confirmationText: 'Delete',
      cancellationTest: 'Cancel',
      confirmationButtonProps: {variant: 'contained', color: 'error'},
      cancellationButtonProps: {variant: 'outlined'},
      allowClose: true,
      dialogProps: {maxWidth: 'xs'},
    })
        .then(() => {
          deleteApplication();
          handleClose();
        });
  };

  const handleClose = () => {
    setAnchor(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        id={`application-${aid}-options`}
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleOpenClick}
        className='absolute top-2 right-2'
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id={`application-${aid}-options-menu`}
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <InfoIcon>
            <ContentCut fontSize={fontSizeString} />
          </InfoIcon>
          <ListItemText className={menuItemClassName}>View details</ListItemText>
        </MenuItem>
        <Divider className='my-1' />
        <MenuItem onClick={() => showModal(EditApplicationModal, {aid})}>
          <EditIcon>
            <ContentCut fontSize={fontSizeString} />
          </EditIcon>
          <ListItemText className={menuItemClassName}>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => showModal(CreateInterviewModal, {aid})}>
          <BusinessIcon>
            <ContentCut fontSize={fontSizeString} />
          </BusinessIcon>
          <ListItemText className={menuItemClassName}>Create Interview</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <PushPinIcon>
            <ContentCut fontSize={fontSizeString} />
          </PushPinIcon>
          <ListItemText className={menuItemClassName}>Pin</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ArchiveIcon>
            <ContentCut fontSize={fontSizeString} />
          </ArchiveIcon>
          <ListItemText className={menuItemClassName}>Archive</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <StarBorderIcon>
            <ContentCut fontSize={fontSizeString} />
          </StarBorderIcon>
          <ListItemText className={menuItemClassName}>Favorite</ListItemText>
        </MenuItem>
        <Divider className='my-1'/>
        <MenuItem onClick={handleDelete} className='hover:text-red-500'>
          <DeleteIcon>
            <ContentCut fontSize={fontSizeString} />
          </DeleteIcon>
          <ListItemText className={menuItemClassName}>Delete</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
}

ApplicationCardMenu.propTypes = {
  aid: PropTypes.number,
};

export default ApplicationCardMenu;
