import React from 'react';
import PropTypes from 'prop-types';


export default function TabPanel({children, value, index, ...other}) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className='h-full'
      {...other}
    >
      {value === index && (
        <div className='h-full'>
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
