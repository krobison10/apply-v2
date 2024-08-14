import React from 'react';
import PropTypes from 'prop-types';

import ArchiveIcon from '@mui/icons-material/Archive';
import {Tooltip} from '@mui/material';

export default function ArchivedBadge({className}) {
  return (
    <Tooltip title='Archived' className={className}>
      <div className='w-6 h-6 rounded-[4px] bg-[#EAEAEA] flex items-center justify-center cursor-pointer'>
        <ArchiveIcon className='w-4 h-4'/>
      </div>
    </Tooltip>
  );
};

ArchivedBadge.propTypes = {
  className: PropTypes.string,
};
