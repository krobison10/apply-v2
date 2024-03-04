import React from 'react';
import PropTypes from 'prop-types';

import {Divider} from '@mui/material';

import CompactApplicationCard from '@/components/applications_feed/CompactApplicationCard';

export default function ExpandedApplicationsList({applications}) {
  return (
    <div className='w-full my-4'>
      {applications.map((application, index) => {
        const first = index === 0;
        const last = index === applications.length - 1;
        return (
          <div key={application.aid}>
            <CompactApplicationCard data={application} first={first} last={last}/>
            {!last && <Divider className='opacity-40'/>}
          </div>
        );
      })}
    </div>
  );
}

ExpandedApplicationsList.propTypes = {
  applications: PropTypes.array,
};

