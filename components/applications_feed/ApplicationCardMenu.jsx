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

function ApplicationCardMenu({aid, data, className}) {
  const [anchor, setAnchor] = useState(null);
  const {showModal} = useModal();

  // eslint-disable-next-line no-unused-vars
  const [deleteResponse, deleteLoading, deleteError, clearDeleteError, deleteApplication] = useApi('DELETE', `applications?aid=${aid}`);
  const confirmDelete = useConfirm();
  if (deleteResponse) {
    window.location.reload();
  }

  // eslint-disable-next-line no-unused-vars
  const [pinResponse, pinLoading, pinError, clearPinError, pinApplication] = useApi('PUT', `applications/pin?aid=${aid}`);
  if (pinResponse) {
    window.location.reload();
  }

  // eslint-disable-next-line no-unused-vars
  const [archiveResponse, archiveLoading, archiveError, clearArchiveError, archiveApplication] = useApi('PUT', `applications/archive?aid=${aid}`);
  if (archiveResponse) {
    window.location.reload();
  }

  const open = Boolean(anchor);

  const handleOpenClick = (event) => {
    event.preventDefault();
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
    <div id={`application-${aid}-options-root`}>
      <IconButton
        aria-label="more"
        id={`application-${aid}-options`}
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleOpenClick}
        className={className || 'absolute top-2 right-2'}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        id={`application-${aid}-options-menu`}
        anchorEl={anchor}
        open={open}
        onClose={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => window.location.href = `/application?aid=${aid}`}>
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
        <MenuItem onClick={() => pinApplication({pinned: data.pinned ? 0 : 1})}>
          <PushPinIcon>
            <ContentCut fontSize={fontSizeString} />
          </PushPinIcon>
          <ListItemText className={menuItemClassName}>{data.pinned ? 'Unpin' : 'Pin'}</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => archiveApplication({archived: data.archived ? 0 : 1})}>
          <ArchiveIcon>
            <ContentCut fontSize={fontSizeString} />
          </ArchiveIcon>
          <ListItemText className={menuItemClassName}>{data.archived ? 'Unarchive' : 'Archive'}</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <StarBorderIcon>
            <ContentCut fontSize={fontSizeString} />
          </StarBorderIcon>
          <ListItemText className={menuItemClassName}>Favorite</ListItemText>
        </MenuItem>
        <Divider className='my-1'/>
        <MenuItem onClick={handleDelete} className='hover:text-error'>
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
  data: PropTypes.object,
  className: PropTypes.string,
};

export default ApplicationCardMenu;
