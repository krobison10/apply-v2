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

function ApplicationCardMenu({aid}) {
  const [anchor, setAnchor] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [data, isLoading, error, clearError, deleteApplication] = useApi('DELETE', `/applications?aid=${aid}`);

  const open = Boolean(anchor);

  if (data) {
    window.location.reload();
  }

  const fontSizeString = 'small';
  const menuItemClassName = 'ml-2';

  const handleOpenClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleDelete = () => {
    deleteApplication();
    handleClose();
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
        <MenuItem onClick={handleClose}>
          <EditIcon>
            <ContentCut fontSize={fontSizeString} />
          </EditIcon>
          <ListItemText className={menuItemClassName}>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleClose}>
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
