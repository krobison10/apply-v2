import React from 'react';
import PropTypes from 'prop-types';

import PushPinIcon from '@mui/icons-material/PushPin';
import {Tooltip} from '@mui/material';

export default function PinnedBadge({className}) {
  return (
    <Tooltip title='Pinned' className={className}>
      <div className='w-6 h-6 rounded-[4px] bg-yellow-200/60 flex items-center justify-center cursor-pointer'>
        <PushPinIcon className='text-amber-400 w-4 h-4'/>
      </div>
    </Tooltip>
  );
};

PinnedBadge.propTypes = {
  className: PropTypes.string,
};
