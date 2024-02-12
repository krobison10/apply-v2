'use client';

import React from 'react';
import PropTypes from 'prop-types';
import {
  ArchiveBoxIcon,
  BuildingOffice2Icon,
  EllipsisHorizontalIcon,
  InformationCircleIcon,
  MapPinIcon,
  PencilSquareIcon,
  StarIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';

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
    return (
      // <Menu placement='bottom-end' className='p-1'>
      //   <MenuHandler>
      //     <div className="absolute top-2 right-2">
      //       <IconButton variant='text' className=''>
      //         <EllipsisHorizontalIcon className="h-6 w-6"/>
      //       </IconButton>
      //     </div>
      //   </MenuHandler>
      //   <MenuList>
      //     <MenuItem className='flex items-center h-8'>
      //       <InformationCircleIcon className='w-5 h-5 inline-block mr-2'/>
      //     View details
      //     </MenuItem>
      //     <hr className="my-1" />
      //     <MenuItem className='flex items-center h-8'>
      //       <BuildingOffice2Icon className='w-5 h-5 inline-block mr-2'/>
      //     Create Interview
      //     </MenuItem>
      //     <MenuItem className='flex items-center h-8'>
      //       <PencilSquareIcon className='w-5 h-5 inline-block mr-2'/>
      //     Edit
      //     </MenuItem>
      //     <MenuItem className='flex items-center h-8' disabled={true}>
      //       <MapPinIcon className='w-5 h-5 inline-block mr-2'/>
      //     Pin
      //     </MenuItem>
      //     <MenuItem className='flex items-center h-8' disabled={true}>
      //       <ArchiveBoxIcon className='w-5 h-5 inline-block mr-2'/>
      //     Archive
      //     </MenuItem>
      //     <MenuItem className='flex items-center h-8' disabled={true}>
      //       <StarIcon className='w-5 h-5 inline-block mr-2'/>
      //     Favorite
      //     </MenuItem>
      //     <hr className="my-1" />
      //     <MenuItem className='flex items-center h-8 group'>
      //       <TrashIcon className='w-5 h-5 inline-block mr-2 group-hover:fill-red-700'/>
      //       <span className='group-hover:text-red-700'>Delete</span>
      //     </MenuItem>
      //   </MenuList>
      // </Menu>
      <></>
    );
  }

  return (
    <div className="rounded-lg relative shadow-sm m-4 p-3 bg-white">
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
