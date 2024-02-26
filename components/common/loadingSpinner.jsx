import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import PropTypes from 'prop-types';

export default function LoadingSpinner({loading, containerHeight = 'h-full'}) {
  return (
    <>
      {loading &&
        <div className={`${containerHeight} h-full flex justify-center items-center`}>
          <CircularProgress/>
        </div>
      }
    </>
  );
}

LoadingSpinner.propTypes = {
  loading: PropTypes.bool,
  containerHeight: PropTypes.string,
};
