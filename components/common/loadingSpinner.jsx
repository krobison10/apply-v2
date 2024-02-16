import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import PropTypes from 'prop-types';

export default function LoadingSpinner({loading}) {
  return (
    <>
      {loading &&
        <div className='w-full h-full flex justify-center items-center'>
          <CircularProgress/>
        </div>
      }
    </>
  );
}

LoadingSpinner.propTypes = {
  loading: PropTypes.bool,
};
