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

const MAX_DESCRIPTION_LENGTH = 200;

/**
 * Application card component for the ApplicationsFeed
 * @param {Object} data Application object from the API response
 * @return {React.Component}
 */
export default function ApplicationCard({data}) {
  /**
   *
   * @param {string} description
   * @return {string}
   */
  function displayDescription(description) {
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      description = description.slice(0, MAX_DESCRIPTION_LENGTH + 1);
      description += '...';
    }
    return description;
  }

  /**
   * Formats a field in the component card
   * @param {React.ReactNode} children
   * @return {React.Component}
   */
  function Field({children}) {
    return (
      <span className="font-semibold">{children}</span>
    );
  }
  Field.propTypes = {
    children: PropTypes.any,
  };

  function OptionsMenu() {
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);

    const handleClick = (event) => {
      setAnchor(event.currentTarget);
    };

    const handleClose = () => {
      setAnchor(null);
    };

    return (
      <div>
        <IconButton
          aria-label="more"
          id={`application-${data.id}-options`}
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
          className='absolute top-2 right-2'
        >
          <MoreHorizIcon />
        </IconButton>

        <Menu
          id={`application-${data.id}-options-menu`}
          anchorEl={anchor}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>
            <InfoIcon>
              <ContentCut fontSize='small' />
            </InfoIcon>
            <ListItemText className='ml-2'>View details</ListItemText>
          </MenuItem>
          <Divider className='my-1' />
          <MenuItem onClick={handleClose}>
            <EditIcon>
              <ContentCut fontSize='small' />
            </EditIcon>
            <ListItemText className='ml-2'>Edit</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <BusinessIcon>
              <ContentCut fontSize='small' />
            </BusinessIcon>
            <ListItemText className='ml-2'>Create Interview</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <PushPinIcon>
              <ContentCut fontSize='small' />
            </PushPinIcon>
            <ListItemText className='ml-2'>Pin</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ArchiveIcon>
              <ContentCut fontSize='small' />
            </ArchiveIcon>
            <ListItemText className='ml-2'>Archive</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <StarBorderIcon>
              <ContentCut fontSize='small' />
            </StarBorderIcon>
            <ListItemText className='ml-2'>Favorite</ListItemText>
          </MenuItem>
          <Divider className='my-1'/>
          <MenuItem onClick={handleClose} className='hover:text-red-500'>
            <DeleteIcon>
              <ContentCut fontSize='small' />
            </DeleteIcon>
            <ListItemText className='ml-2'>Delete</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    );
  }

  return (
    <div className="rounded-lg relative m-4 p-3 mb-6 shadow-sm bg-white">
      <OptionsMenu />

      <h1 className="font-semibold">{data.title}- {data.company}</h1>
      <ul>
        <li><Field>Status: </Field> {data.status}</li>
        {data.description &&
        <li>
          <Field>Description: </Field>
          {displayDescription(data.description)}
        </li>}
        <li>
          <Field>Created: </Field>{
            // eslint-disable-next-line max-len
            new Date(data.created_at).toLocaleDateString('en-US', {weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short'})
          }
        </li>
      </ul>
    </div>
  );
}

ApplicationCard.propTypes = {
  data: PropTypes.object,
};
