import React from 'react';
import PushPinIcon from '@mui/icons-material/PushPin';
import {Tooltip} from '@mui/material';

export default function PinnedBadge() {
  return (
    <Tooltip title='Pinned'>
      <div className='w-6 h-6 rounded-[4px] bg-yellow-200/60 flex items-center justify-center cursor-pointer'>
        <PushPinIcon className='text-amber-400 w-4 h-4'/>
      </div>
    </Tooltip>
  );
};
