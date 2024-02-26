import React from 'react';
import PushPinIcon from '@mui/icons-material/PushPin';

export default function PinnedBadge() {
  return (
    <div className='w-6 h-6 rounded-[4px] bg-yellow-300/60 flex items-center justify-center'>
      <PushPinIcon className='text-amber-400 w-4 h-4'/>
    </div>
  );
};
